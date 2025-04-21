import express from 'express';

const router = express.Router();
import {createOrder,verifyPayment,createListerAccount} from "../../controllers/payments.controller.js"

router.post('/create-order',createOrder)
router.post("/verify-payment",verifyPayment)
router.post("/create-linked-account",createListerAccount)

export default router;