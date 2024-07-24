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
      placeholder="room to enter or event to send"
      value={room}
      onChange={handleRoomChange}
    />
  );
};

export { RoomBox };
