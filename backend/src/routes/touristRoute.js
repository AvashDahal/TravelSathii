import express from 'express';
import { signupUser, loginUser, logoutUser, getUserNameById } from '../controllers/touristController.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/:userId', getUserNameById);

export default router;
