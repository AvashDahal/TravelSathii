import Chat from '../models/chatModel.js';

// Fetch chat list for a guide
export const getChatsForGuide = async (req, res) => {
  try {
    const { guideId } = req.params;
    const chats = await Chat.find({ guideId });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch chat list for a tourist
export const getChatsForTourist = async (req, res) => {
  try {
    const { touristId } = req.params;
    const chats = await Chat.find({ touristId });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch messages between a guide and a tourist
export const getMessages = async (req, res) => {
  try {
    const { guideId, touristId } = req.params;
    const messages = await Chat.find({ guideId, touristId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Post a new message
export const postMessage = async (req, res) => {
  try {
    const { guideId, touristId, message, sender } = req.body;
    const chatMessage = new Chat({ guideId, touristId, message, sender });
    await chatMessage.save();
    res.status(201).json(chatMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
