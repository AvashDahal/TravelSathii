import express from 'express';
import { getChatsForGuide, getChatsForTourist, getMessages, postMessage } from '../controllers/chatController.js';

const router = express.Router();

router.get('/guide/:guideId', getChatsForGuide);
router.get('/tourist/:touristId', getChatsForTourist);
router.get('/:guideId/:touristId', getMessages);
router.post('/', postMessage); // Add the POST endpoint here

export default router;
