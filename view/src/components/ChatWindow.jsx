import { VStack, HStack, Box, Button, Input, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const ChatWindow = ({ socket, currentRoom }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!socket) return;

    // Listen for incoming messages
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Clean up the event listener on unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (socket && message.trim()) {
      socket.emit("sendMessage", { roomId: currentRoom, message });
      setMessage("");
    }
  };

  return (
    <VStack spacing={5} w="100%" p={5}>
      <Heading as="h3" size="lg">
        Chat Room: {currentRoom}
      </Heading>
      <Box
        w="100%"
        maxH="50vh"
        overflowY="auto"
        border="1px solid gray"
        borderRadius="md"
        p={4}
      >
        {messages.map((msg, index) => (
          <Box key={index} p={2} bg="gray.100" borderRadius="md" mb={2}>
            <strong>{msg.user}</strong>: {msg.message}
          </Box>
        ))}
      </Box>
      <HStack w="100%">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <Button onClick={handleSendMessage} colorScheme="teal">
          Send
        </Button>
      </HStack>
    </VStack>
  );
};

export default ChatWindow;
