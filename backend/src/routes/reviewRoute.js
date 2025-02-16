import express from 'express';
import { getAllReviews, getReviewById, createReview, updateReview, deleteReview } from '../controllers/reviewController.js';

const router = express.Router();

// GET all reviews
router.get('/', getAllReviews);

// GET a specific review
router.get('/:guideId', getReviewById);

// POST a new review
router.post('/createReview', createReview);

// PUT/update a review
router.put('/:id', updateReview);

// DELETE a review
router.delete('/:id', deleteReview);

export default router;