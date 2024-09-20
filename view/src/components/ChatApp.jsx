import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import RoomSelector from "./RoomSelector";
import ChatWindow from "./ChatWindow";

const ChatApp = () => {
  const [token, setToken] = useState(null);
  const [socket, setSocket] = useState(null);
  const [rooms, setRooms] = useState(["Room1", "Room2", "Room3"]);
  const [currentRoom, setCurrentRoom] = useState("Room1");

  useEffect(() => {
    if (token) {
      const socketConnection = io("http://localhost:8080", {
        query: { token },
      });
      setSocket(socketConnection);

      // Clean up the socket connection on component unmount
      return () => {
        socketConnection.disconnect();
      };
    }
  }, [token]);

  const handleJoinRoom = (room) => {
    if (socket) {
      socket.emit("joinRoom", room);
      setCurrentRoom(room);
    }
  };

  return (
    <div>
      <RoomSelector
        rooms={rooms}
        currentRoom={currentRoom}
        handleJoinRoom={handleJoinRoom}
      />
      {token && socket && (
        <ChatWindow socket={socket} currentRoom={currentRoom} />
      )}
    </div>
  );
};

export default ChatApp;
