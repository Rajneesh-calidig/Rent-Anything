import express from 'express';
import { protectRoute } from "../../middleware/protectRoute.js";
import  {createRental,getMyRentals,getRentalsForMyItems,updateRentalStatus} from '../../controllers/rental.controller.js';


const router = express.Router();

router.post('/', protectRoute, createRental);
router.get('/my', protectRoute, getMyRentals);
router.get('/my-items', protectRoute, getRentalsForMyItems);
router.put('/:id/status', protectRoute, updateRentalStatus);

export default router;