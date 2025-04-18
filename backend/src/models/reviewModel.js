import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  guide: {
    type: String,

    required: true,
  },
  tourist: {
    type: String,

    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Review = mongoose.model("Review", reviewSchema);

export default Review;
