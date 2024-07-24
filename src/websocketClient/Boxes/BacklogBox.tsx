import { ChangeEvent } from "react";

interface BacklogBoxProps {
  backlogRef: React.RefObject<HTMLTextAreaElement>;
  backlogMessage: string;
  handleBacklogMessage: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const BacklogBox: React.FC<BacklogBoxProps> = ({
  backlogRef,
  backlogMessage,
  handleBacklogMessage,
}) => {
  return (
    <textarea
      ref={backlogRef}
      className="backLog"
      placeholder="callback retornado pelo back"
      value={backlogMessage}
      onChange={handleBacklogMessage}
      readOnly
    />
  );
};

export { BacklogBox };
