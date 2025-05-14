import express from 'express';
import {
  getAllItems,
  getItemById,
  deleteItem,
  updateItem,
} from '../../controllers/admin/itemController.js';

const router = express.Router();

router.get('/', getAllItems);
router.get('/:id', getItemById);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
