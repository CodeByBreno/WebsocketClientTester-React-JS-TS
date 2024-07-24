import { ChangeEvent } from "react";

interface RoomBoxProps {
  room: string;
  handleRoomChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RoomBox: React.FC<RoomBoxProps> = ({ room, handleRoomChange }) => {
  return (
    <input
      type="text"
      className="inputSend"
      placeholder="evento a enviar ou sala para entrar"
      value={room}
      onChange={handleRoomChange}
    />
  );
};

export { RoomBox };
