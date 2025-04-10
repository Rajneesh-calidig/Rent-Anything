import  express from 'express';
import { protectRoute } from "../../middleware/protectRoute.js";
import {createItem,getAllItems,getItemById,updateItem,deleteItem} from '../../controllers/items.controller.js';


const router = express.Router();


router.post('/', protectRoute, createItem);
router.get('/', getAllItems);
router.get('/:id', getItemById);
router.put('/:id', protectRoute, updateItem);
router.delete('/:id', protectRoute, deleteItem);

export default router;