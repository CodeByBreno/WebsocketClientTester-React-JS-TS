import { ChangeEvent } from "react";

interface EventListenerBox {
  event: string;
  handleEventListeningChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const EventListenerBox: React.FC<EventListenerBox> = ({
  event,
  handleEventListeningChange,
}) => {
  return (
    <input
      type="text"
      className="inputSend"
      placeholder="listen to event"
      value={event}
      onChange={handleEventListeningChange}
    />
  );
};

export { EventListenerBox };
