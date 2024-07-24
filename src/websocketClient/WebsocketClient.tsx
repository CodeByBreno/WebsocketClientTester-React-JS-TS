/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./styles.css";
import { io } from "socket.io-client";
import { ConnectButton } from "./Buttons/ConnectButton";
import { SendButton } from "./Buttons/SendButton";
import { DisconnectButton } from "./Buttons/DisconnectButton";
import { RoomBox } from "./Boxes/RoomBox";
import { SendMessageBox } from "./Boxes/SendMessageBox";
import { BacklogBox } from "./Boxes/BacklogBox";
import { EventEmitButton } from "./Buttons/EventEmitButton";
import { EventListenerBox } from "./Boxes/EventListenerBox";
import { ListenToEventButton } from "./Buttons/ListenToEvent";
import { RenderObject } from "./RenderObject/RenderObject";

const socket = io("http://localhost:3000");

const formatMessage = (message: any) => {
  let messageObject;
  try {
    messageObject = JSON.parse(message);
  } catch (e) {
    messageObject = message;
  }
  return messageObject;
};

function WebsocketClient() {
  const [sendMessage, setSendMessage] = useState("");
  const [recieveMessage, setReceivedMessage] = useState("");
  const [room, setRoom] = useState("");
  const [backlogMessage, setBacklogMessage] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [disableEventEmit, setDisableEventEmit] = useState(false);
  const [eventListening, setEventListening] = useState("");
  const [roomIn, setRoomIn] = useState<string | undefined>();

  const backlogRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setSendMessage(event.target.value);
  };

  const handleRoomChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoom(event.target.value);
    setIsDisable(true);
  };

  const handleBacklogMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBacklogMessage(event.target.value);
    handleConnectionRoom();
  };

  const handleEventListeningChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEventListening(event.target.value);
  };

  const handleConnectionRoom = () => {
    socket.emit("joinRoom", room, (response: string) => {
      addBacklogMessage(response);
      socket.off(room);
      socket.on(room, (response) => setReceivedMessage(response));
      setRoomIn(room);
    });
  };

  const handleSendButton = () => {
    if (sendMessage === "") {
      addBacklogMessage("Nenhuma mensagem informada");
      return;
    }
    sendToSocket(sendMessage);
  };

  const handleConnectionButton = () => {
    if (!room || room === "") {
      addBacklogMessage("Nenhuma sala ou evento para ouvir informado");
      return;
    }

    handleConnectionRoom();
    if (socket.connected) {
      setIsDisable(false);
      setDisableEventEmit(true);
    }
  };

  const handleDisconnectButton = () => {
    socket.off(room);
    setIsDisable(true);
    setDisableEventEmit(false);
    setRoom("");
    setRoomIn(undefined);
    addBacklogMessage("Desconetado do websocket");
  };

  const handleListenToEventButton = () => {
    if (!eventListening || eventListening === "") {
      addBacklogMessage("Informe um evento para ouvir");
      return;
    }

    socket.on(eventListening, (response: string) => {
      setReceivedMessage(response);
    });
    addBacklogMessage(`Ouvindo evento ${eventListening}`);
  };

  const handleEmitEventButton = async () => {
    if (!room || room === "") {
      addBacklogMessage("Informe um evento para emitir");
      return;
    }

    try {
      const messageObject = JSON.parse(sendMessage);
      addBacklogMessage("A mensagem foi identificada como um JSON");

      socket.emit(room, messageObject, (response: string) =>
        addBacklogMessage(response)
      );

      if (
        typeof messageObject === "object" &&
        messageObject.user_id &&
        typeof messageObject.user_id === "string"
      ) {
        const user_id_string: string = messageObject.user_id;
        setRoomIn(user_id_string.substring(0, 30) + "...");
      }
    } catch (e) {
      addBacklogMessage("A mensagem NÃO é um JSON. Foi enviado uma String");
    }
  };

  const addBacklogMessage = (next: string) => {
    setBacklogMessage(
      `${backlogMessage}${backlogMessage !== "" ? "\n" : ""}${next}`
    );
    scrollToBacklogBottom();
  };

  const scrollToBacklogBottom = () => {
    if (backlogRef.current) {
      backlogRef.current.scrollTop = backlogRef.current.scrollHeight;
    }
  };

  const sendToSocket = (message: string) => {
    if (socket.disconnected) {
      addBacklogMessage("ERRO: Conexão com websocket falhou");
      return;
    }

    socket.emit(`broadcast`, message, room, (response: string) => {
      if (!response && response !== "")
        addBacklogMessage("O back não retornou nada");
      else {
        addBacklogMessage(response);
      }
    });
  };

  useEffect(() => {
    socket.connect();

    return () => {
      if (socket.connected) socket.disconnect();
    };
  }, []);

  return (
    <>
      <h1 className="title">Testando Websocket</h1>
      <div className="manageConnectionButtons">
        <EventEmitButton
          handleEmitEventButton={handleEmitEventButton}
          disableEventEmit={disableEventEmit}
        />
        <ListenToEventButton
          handleListenToEventButton={handleListenToEventButton}
          disableEventEmit={disableEventEmit}
        />
        <ConnectButton handleConnectionButton={handleConnectionButton} />
        <SendButton handleSendButton={handleSendButton} isDisable={isDisable} />
        <DisconnectButton
          handleDisconnectButton={handleDisconnectButton}
          isDisable={isDisable}
        />
      </div>
      <div className="inputs">
        <div className="sendArea">
          <RoomBox room={room} handleRoomChange={handleRoomChange} />
          <EventListenerBox
            event={eventListening}
            handleEventListeningChange={handleEventListeningChange}
          />
          <SendMessageBox
            sendMessage={sendMessage}
            handleSendMessage={handleSendMessage}
          />
        </div>
        <div className="responses">
          <div className="roomConected">
            {roomIn ? (
              <h2>
                Conectado na sala {room === roomIn ? "de Broadcast " : ""}
                <strong className="roomName">{roomIn}</strong>
              </h2>
            ) : (
              <h2>Não está conectado</h2>
            )}
          </div>
          <BacklogBox
            backlogRef={backlogRef}
            backlogMessage={backlogMessage}
            handleBacklogMessage={handleBacklogMessage}
          />
          <div
            className={`recievedMessageBox ${recieveMessage ? "" : "grayText"}`}
          >
            <RenderObject
              obj={formatMessage(
                recieveMessage || "mensagem retornada pelo back"
              )}
              level={0}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default WebsocketClient;
