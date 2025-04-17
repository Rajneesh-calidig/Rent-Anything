import Razorpay from 'razorpay';
import dotenv from 'dotenv'
import crypto from "crypto";

const instance = new Razorpay({
  key_id: process.env.key_id,
  key_secret:process.env.key_secret
});

export const payments= async (req, res) => {
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


export const verifyPayment=async(req,res)=>{
    try{
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const keySecret = process.env.key_secret;

        const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");


  if (generatedSignature  === razorpay_signature) {
    // payment is legit
    console.log("payment id",razorpay_payment_id)
   try{
    const paymentDetails = await instance.payments.fetch(razorpay_payment_id);
    console.log("payment details of",paymentDetails)
    res.status(200).json({
      success:true,
      data:paymentDetails
    })
   }catch(error){
    res.status(400).json({
      success:false,
      message:error.message
    })
   }
  } else {
    res.status(400).json({ success: false, message: "Payment verification failed" });
  }
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}