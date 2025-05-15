import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateNewLister
} from '../../controllers/admin/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.put("/lister/:id",updateNewLister)
router.delete('/:id', deleteUser);

export default router;
