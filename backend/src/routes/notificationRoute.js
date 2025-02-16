// src/routes/notificationRoute.js
import express from 'express';
import Notification from '../models/notificationModel.js';

const router = express.Router();

// Fetch notifications for a specific tourist
router.get('/:touristId', async (req, res) => {
  try {
    const { touristId } = req.params;
    const notifications = await Notification.find({ touristId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

export default router;
