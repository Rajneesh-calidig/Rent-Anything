import express from 'express';
import {
  getAllReviews,
  getReviewById,
  deleteReview,
} from '../../controllers/admin/reviewController.js';

const router = express.Router();

router.get('/', getAllReviews);
router.get('/:id', getReviewById);
router.delete('/:id', deleteReview);

export default router;
