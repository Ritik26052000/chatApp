import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Flex,
  Text,
  VStack,
  Heading,
  HStack,
} from "@chakra-ui/react";

const Chat = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!socket) return; // If socket is not available, return early

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Clean up the event listener when component unmounts or socket changes
    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (socket && message.trim()) {
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      w="100%"
      h="100vh"
      p={5}
      bg="gray.50"
    >
      <Box
        w="100%"
        maxW="600px"
        bg="white"
        boxShadow="md"
        borderRadius="md"
        p={5}
      >
        <Heading as="h2" size="lg" mb={4} textAlign="center">
          Chat Room
        </Heading>

        {/* Message Display Section */}
        <VStack
          spacing={3}
          overflowY="auto"
          maxH="60vh"
          bg="gray.100"
          borderRadius="md"
          p={4}
          mb={4}
        >
          {messages.length === 0 ? (
            <Text color="gray.500">No messages yet...</Text>
          ) : (
            messages.map((msg, index) => (
              <Box key={index} w="100%">
                <HStack>
                  <Text fontWeight="bold" color="teal.500">
                    {msg.user}:
                  </Text>
                  <Text>{msg.message}</Text>
                </HStack>
              </Box>
            ))
          )}
        </VStack>

        {/* Input and Send Button */}
        <HStack w="100%">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            bg="white"
            boxShadow="sm"
            borderColor="gray.300"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            colorScheme="teal"
            variant="solid"
            isDisabled={!message.trim()}
          >
            Send
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default Chat;
