import express from 'express';

import { protectRoute } from "../../middleware/protectRoute.js";
import  {createReview,getReviewsByItem,deleteReview} from '../../controllers/review.controller.js';

const router = express.Router();

router.post('/', protectRoute,createReview);
router.get('/:itemId',getReviewsByItem);
router.delete('/:id', protectRoute,deleteReview);

export default router;