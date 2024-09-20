import React, { useEffect, useState } from "react";
import { io } from "socket.io-client"; // Ensure the correct import
import axios from "axios";
import Chat from "./components/Chat";
import AuthForm from "./components/AuthForm";

const App = () => {
  const [token, setToken] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (token) {
      const socketConnection = io("http://localhost:8080", {
        query: { token },
      });
      setSocket(socketConnection);

      // Clean up socket connection when component unmounts or token changes
      return () => {
        socketConnection.disconnect();
      };
    }
  }, [token]);

  const handleLogin = async (loginData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        loginData
      );
      setToken(response.data.token);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div>
      {token ? <Chat socket={socket} /> : <AuthForm onLogin={handleLogin} />} 
      {/* {token ? <ChatApp /> : <AuthForm onLogin={handleLogin} />} */}
    </div>
  );
};

export default App;
