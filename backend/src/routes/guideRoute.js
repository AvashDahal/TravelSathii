import express from 'express';
import { signupUser,loginUser,logoutUser } from '../controllers/guideController.js';
import { getRecommendedUsers } from '../controllers/recommendController.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/recommend', getRecommendedUsers);




export default router;