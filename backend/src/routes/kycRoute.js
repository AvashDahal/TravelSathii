import express from 'express';
import { createKYC } from '../controllers/kycController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/create', upload.fields(
    [
        { name: 'image', maxCount: 1 },
        { name: 'citizenshipPhoto', maxCount: 1 }
      ]

), createKYC);

export default router;
