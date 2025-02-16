import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  coverImage: {
    type: String,
    required: false,
  },
  quote: {
    type: String,
    required: true,
  },
  aboutMe: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
  activities: {
    type: [String],
    required: true,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },  
});

const Profile = model('Profile', profileSchema);

export default Profile;
