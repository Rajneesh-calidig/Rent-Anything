import Razorpay from 'razorpay';
import dotenv from 'dotenv'
import crypto from "crypto";
import payment from "../models/payment.js"
import User from "../models/User.js"

const instance = new Razorpay({
  key_id: process.env.key_id,
  key_secret:process.env.key_secret
});

export const createOrder= async (req, res) => {
    const { amount, itemData } = req.body;

    const options = {
      amount: amount, // in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      // DO NOT include itemData here
    };
  try {
    const order = await instance.orders.create(options);
    res.json(order); // frontend will need this
  } catch (err) {
    res.status(500).send(err);
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const keySecret = process.env.key_secret;
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      item_id,
      rentee_id,
      owner_id,
      amount,
      commission,
      transfer_amount,
      owner_razorpay_account_id,
    } = req.body;

    // 1️⃣ Signature Verify
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // 2️⃣ Fetch payment details from Razorpay
    const paymentDetails = await instance.payments.fetch(razorpay_payment_id);

    if (paymentDetails.status !== "captured") {
      return res.status(400).json({
        success: false,
        message: "Payment not captured",
        paymentDetails,
      });
    }

    // 3️⃣ Save to DB
    // const newPayment = await payment.create({
    //   razorpay_order_id,
    //   razorpay_payment_id,
    //   razorpay_signature,
    //   item_id,
    //   rentee_id,
    //   owner_id,
    //   owner_razorpay_account_id,
    //   amount,
    //   commission,
    //   transfer_amount,
    //   status: "success",
    //   notes: paymentDetails.notes || {},
    //   paid_at: paymentDetails.created_at
    //     ? new Date(paymentDetails.created_at * 1000)
    //     : new Date(),
    // });

    // 4️⃣ Send final response to frontend
    return res.status(200).json({
      success: true,
      message: "Payment verified and saved successfully",
      // payment: {
      //   razorpay_payment: paymentDetails,
      //   db_record: newPayment,
      // },
    });
  } catch (error) {
    console.error("Verify Payment Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


export const createListerAccount=  async (req, res) => {
  const { userId, name, email, contact } = req.body;
  try {
    const response = await instance.accounts.create({
      type: "individual",
      name,
      email,
      contact,
      legal_business_name: name,
      business_type: "individual",
      customer_facing_business_name: `${name}'s Rentals`,
    });

    await User.findByIdAndUpdate(userId, {
      razorpay_account_id: response.id,
    });

    res.status(200).json({ status: "success", account_id: response.id });
  } catch (err) {
    res.status(400).send({err})
}
}