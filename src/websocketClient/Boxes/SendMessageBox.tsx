import { ChangeEvent } from "react";

interface SendMessageBoxProps {
  sendMessage: string;
  handleSendMessage: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const SendMessageBox: React.FC<SendMessageBoxProps> = ({
  sendMessage,
  handleSendMessage,
}) => {
  return (
    <textarea
      className="sendMessage"
      placeholder="mensagem a ser enviada"
      value={sendMessage}
      onChange={handleSendMessage}
    ></textarea>
  );
};

export { SendMessageBox };
