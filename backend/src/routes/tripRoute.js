import express from 'express';
import { createTrip, getTrips, getTripById } from '../controllers/tripController.js';

const router = express.Router();

router.post('/create', createTrip);
router.get('/get/:guideId', getTrips); // Endpoint to get trips by guideId
router.get('/:tripId', getTripById); // Endpoint to get a specific trip by tripId

export default router;
