import express from 'express';

const router = express.Router();
import {payments,verifyPayment} from "../../controllers/payments.controller.js"

router.post('/create-order',payments)
router.post("/verify-payment",verifyPayment)

export default router;