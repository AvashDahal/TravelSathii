// Import mongoose
import mongoose from "mongoose";

// Define the schema for TouristProfile
const touristProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Replace 'User' with the name of your user model
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  interests: {
    type: [String],
    required: true,
  },
  preferences: {
    type: [String],
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
});

// Create and export the TouristProfile model
const TouristProfile = mongoose.model("TouristProfile", touristProfileSchema);
export default TouristProfile;
