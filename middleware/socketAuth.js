const jwt = require("jsonwebtoken");

const authenticateSocket = (socket, next) => {
  const token = socket.handshake.query.token;

  if (!token) return next(new Error("Authentication error"));

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) return next(new Error("Authenication error"));
    socket.userId = decode.userId;
    next();
  });
};

module.exports = { authenticateSocket };


// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');

// const authenticateSocket = async (socket, next) => {
//   const token = socket.handshake.query.token;
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     socket.userId = decoded.userId;  // Attach user ID to the socket
//     const user = await User.findById(socket.userId);
//     socket.username = user.username;  // Attach username to the socket
//     next();
//   } catch (err) {
//     next(new Error('Authentication error'));
//   }
// };

// module.exports = { authenticateSocket };
