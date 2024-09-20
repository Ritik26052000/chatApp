import { Select } from "@chakra-ui/react";

const Room = ({ rooms, currentRoom, handleJoinRoom }) => {
  return (
    <Select
      onChange={(e) => handleJoinRoom(e.target.value)}
      value={currentRoom}
    >
      {rooms.map((room, index) => (
        <option key={index} value={room}>
          {room}
        </option>
      ))}
    </Select>
  );
};

export default Room;
