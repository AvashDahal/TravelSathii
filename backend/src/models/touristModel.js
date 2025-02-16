import mongoose from 'mongoose';

const touristSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['guide', 'tourist'],
    default: 'tourist', // Default role is 'tourist'
  },
});

const Tourist = mongoose.model('Tourist', touristSchema);

export default Tourist;