import express from 'express';

const router = express.Router();
import {createOrderByStripe,verifyPayment,createListerAccount,listerPayout,updateConnectedAccount,getConnectedAccountBalance} from "../../controllers/payments.controller.js"

router.post('/create-checkout-session',createOrderByStripe)
// router.post('/webhook', express.raw({ type: 'application/json' }),stripeWebhook)
// router.post("/verify-payment",verifyPayment)
router.post('/create-linked-account',createListerAccount)
router.post('/update-account/:accountId',updateConnectedAccount)
router.post('/lister-payout',listerPayout)
router.get('/account-balance',getConnectedAccountBalance)

export default router;