import express from 'express';
import { getAdminStats } from '../../controllers/admin/statsController.js';

const router = express.Router();

router.get('/stats', getAdminStats);

export default router;
