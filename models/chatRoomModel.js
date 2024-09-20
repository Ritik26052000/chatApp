// models/chatRoomModel.js
const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  isGroupChat: { type: Boolean, default: false },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  name: { type: String }, // Group name for group chats
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
