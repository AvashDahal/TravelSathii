// controllers/reviewController.js
import Review from "../models/reviewModel.js";
import Guide from "../models/guideModel.js";

// Controller function to add a review for a guide
// const addReview = async (req, res) => {
//     try {
//         const { guideId, rating, comment } = req.body;

//         // Find the guide by ID
//         const guide = await Guide.findById(guideId);
//         if (!guide) {
//             return res.status(404).json({ error: 'Guide not found' });
//         }

//         // Create a new review
//         const newReview = new Review({
//             guide: guideId,
//             rating,
//             comment
//         });

//         // Save the review to the database
//         const savedReview = await newReview.save();

//         // Add the review to the guide's reviews array
//         guide.reviews.push(savedReview._id);
//         await guide.save();

//         // Return the saved review
//         res.status(201).json(savedReview);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to add review' });
//     }
// };

// Controller function to get all reviews for a guide
const getGuideReviews = async (req, res) => {
  try {
    const { guideId } = req.params;

    const guide = await Guide.findById(guideId).populate("reviews");
    if (!guide) {
      return res.status(404).json({ error: "Guide not found" });
    }

    res.status(200).json(guide.reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to get guide reviews" });
  }
};

// Controller function to get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to get all reviews" });
  }
};

// Controller function to get a specific review by ID
const getReviewById = async (req, res) => {
  try {
    const { guideId } = req.params;

    // Find reviews where the 'guide' field matches the guideId
    const reviews = await Review.find({ guide: guideId });

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ error: "No reviews found for this guide" });
    }

    // Extract comments from reviews
    const comments = reviews.map((review) => review.comment);

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error getting reviews by guide ID:", error);
    res.status(500).json({ error: "Failed to get reviews by guide ID" });
  }
};

// Controller function to create a new review
const createReview = async (req, res) => {
    try {
      const { guide, tourist, rating, comment } = req.body;
  
      if (!guide || !tourist) {
        return res.status(400).json({ error: 'Guide and Tourist IDs are required.' });
      }
  
      const newReview = new Review({
        guide,
        tourist,
        rating,
        comment,
      });
  
      const savedReview = await newReview.save();
      res.status(201).json(savedReview);
      
    } catch (error) {
      console.error('Error creating review:', error);
      res.status(500).json({ error: 'Failed to create review' });
    }
  };
// Controller function to update a review
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    review.rating = rating;
    review.comment = comment;

    const updatedReview = await review.save();
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: "Failed to update review" });
  }
};

// Controller function to delete a review
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    await review.remove();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete review" });
  }
};
export {
  getGuideReviews,
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
