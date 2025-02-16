import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  guideId: { type: String, required: true },
  touristId: { type: String, required: true },
  message: { type: String, required: true },
  sender: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
