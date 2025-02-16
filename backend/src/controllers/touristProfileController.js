import TouristProfile from '../models/touristProfileModel.js';
import jwt from 'jsonwebtoken';

// Function to extract user ID from JWT token in the Authorization header
const getUserIdFromToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Authentication token missing');
  }

  const token = authHeader.split(' ')[1]; // Bearer <token>
  const decoded = jwt.verify(token, 'jyoti');
  return decoded.userId;
};

// Create tourist profile
// POST /api/profiles
export const createTouristProfile = async (req, res) => {
  const { bio, location, interests, preferences, languages } = req.body;
  const profileImage = req.file.path.replace(/\\/g, "/").replace(/^public\//, "");

  try {
    const userId = getUserIdFromToken(req);

    const newProfile = new TouristProfile({
      user: userId, // Link profile to authenticated user
      bio,
      profileImage,
      location,
      interests,
      preferences,
      languages,
    });

    await newProfile.save();
    res.status(201).json(newProfile);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tourist profiles of the authenticated user
// GET /api/profiles
export const getTouristProfiles = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const profiles = await TouristProfile.find({ user: userId }).populate('user', 'fullName email');
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific tourist profile by ID
// GET /api/profiles/:id
export const getTouristProfileById = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const profile = await TouristProfile.findOne({ user: userId }).populate('user', 'fullName email');
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Update tourist profile by ID
// PUT /api/profiles/:id
export const updateTouristProfile = async (req, res) => {
    const userId = getUserIdFromToken(req); // Get user ID from token
  
    const { bio, location, interests, preferences, languages } = req.body;
    const profileImage = req.file ? req.file.path.replace(/\\/g, "/").replace(/^public\//, "") : undefined;
  
    try {
      // Find the profile by user ID
      const profile = await TouristProfile.findOne({ user: userId });
  
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      // Update fields if provided
      if (bio) profile.bio = bio;
      if (location) profile.location = location;
      if (interests) profile.interests = interests;
      if (preferences) profile.preferences = preferences;
      if (languages) profile.languages = languages;
      if (profileImage) profile.profileImage = profileImage;
  
      // Save the updated profile
      await profile.save();
  
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Delete tourist profile by ID
// DELETE /api/profiles/:id
export const deleteTouristProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const userId = getUserIdFromToken(req);
    const profile = await TouristProfile.findOne({ _id: id, user: userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    await TouristProfile.deleteOne({ _id: id, user: userId });
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Exporting all functions as a single module
export default {
  createTouristProfile,
  getTouristProfiles,
  getTouristProfileById,
  updateTouristProfile,
  deleteTouristProfile,
};
