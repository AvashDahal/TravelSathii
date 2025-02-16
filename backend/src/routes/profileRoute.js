
import express from "express";
import {
  createProfile,
  getAllProfiles,
  getProfileByGuideId,

 
} from "../controllers/profileController.js";
import uploadImage from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.post('/create', uploadImage, createProfile);
router.get('/allprofile', getAllProfiles);
router.get('/guide/:guideId', getProfileByGuideId);







export default router;
