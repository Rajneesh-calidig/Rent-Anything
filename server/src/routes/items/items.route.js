import  express from 'express';
import { protectRoute } from "../../middleware/protectRoute.js";
import {createItem,getAllItems,getItemById,updateItem,deleteItem, searchItems} from '../../controllers/items.controller.js';
import { uploadItemsImages } from '../../middleware/upload.js';

const router = express.Router();


router.post('/', protectRoute,uploadItemsImages.array('itemsImages',5), createItem);
router.get('/', getAllItems);
router.get('/:id', getItemById);
router.put('/:id', protectRoute,uploadItemsImages.array('itemsImages',5), updateItem);
router.delete('/:id', protectRoute, deleteItem);
router.get('/search',searchItems);

export default router;