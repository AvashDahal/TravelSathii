import Trip from "../models/tripModel.js";

export const createTrip = async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTrips = async (req, res) => {
  try {
    const guideId = req.params.guideId; // Assuming guideId is passed as a parameter
    
    const trips = await Trip.find({ guideId: guideId });
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTripById = async (req, res) => {
  try {
    const tripId = req.params.tripId; // Assuming tripId is passed as a parameter
    
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
