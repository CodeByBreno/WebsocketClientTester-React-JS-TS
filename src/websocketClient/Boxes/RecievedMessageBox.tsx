import { ChangeEvent } from "react";

interface RecievedMessageBoxProps {
  recieveMessage: string;
  handleReceivedMessage: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const RecievedMessageBox: React.FC<RecievedMessageBoxProps> = ({
  recieveMessage,
  handleReceivedMessage,
}) => {
  return (
    <textarea
      className="recieveMessage"
      placeholder="recieveMessage"
      value={recieveMessage}
      onChange={handleReceivedMessage}
      readOnly
    />
  );
};

export { RecievedMessageBox };
