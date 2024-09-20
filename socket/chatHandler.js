const User = require("../models/userModel");

const chatHandler = async (socket, io) => {
  socket.on("sendMessage", async (message) => {
    console.log(socket.userId);
    try {
      // Find the user based on socket.userId
      const userDetail = await User.findOne({ _id: socket.userId });

      if (userDetail) {
        // console.log(`Message from ${userDetail.username}: ${message}`);

        // Emit the username along with the message
        io.emit("receiveMessage", { user: userDetail.username, message });
      } else {
        console.log("User not found");
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.userId} disconnected`);
  });
};

module.exports = { chatHandler };

// const User = require("../models/userModel");
// const ChatRoom = require("../models/chatRoomModel");
// const Message = require("../models/messageModel");

// const chatHandler = (socket, io) => {
//   // Join a room based on room ID
//   socket.on("joinRoom", async (roomId) => {
//     socket.join(roomId);
//     console.log(`User ${socket.userId} joined room ${roomId}`);
//   });

//   // Handle sending a message to a specific room
//   socket.on("sendMessage", async ({ roomId, message }) => {
//     // Save message to database
//     const newMessage = await Message.create({
//       roomId,
//       sender: socket.userId,
//       message,
//     });

//     // Emit the message to everyone in the room
//     io.to(roomId).emit("receiveMessage", {
//       user: socket.username, // Assuming you store this on the socket
//       message: newMessage.message,
//       timestamp: newMessage.timestamp,
//     });
//   });

//   // Disconnect logic
//   socket.on("disconnect", () => {
//     console.log(`User ${socket.userId} disconnected`);
//   });
// };

// module.exports = { chatHandler };
