import express from 'express';
import multer from 'multer'; // If using multer for file uploads

import {
  createTouristProfile,
  getTouristProfiles,
  getTouristProfileById,
  updateTouristProfile,
  deleteTouristProfile
} from '../controllers/touristProfileController.js';

const router = express.Router();


const upload = multer({ dest: 'public/uploads/' });


router.post('/', upload.single('profileImage'), createTouristProfile);


router.get('/', getTouristProfiles);


router.get('/:user_id', getTouristProfileById);

router.put('/:user_id', upload.single('profileImage'), updateTouristProfile);


router.delete('/:id', deleteTouristProfile);

export default router;
