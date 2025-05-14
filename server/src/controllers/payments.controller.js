import Razorpay from 'razorpay';
import dotenv from 'dotenv'
import crypto from "crypto";
import Payment from "../models/payment.js"
import User from "../models/User.js"
import Stripe from "stripe"
import Rental from "../models/rental.js"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const stripeWebHookKey=process.env.STRIPE_WEBHOOK_KEY
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET
});

const endpointSecret = stripeWebHookKey;

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


export const createOrderByStripe = async (req, res) => {
  try {
    const { product, email ,totalPrice,startDate,endDate} = req.body;
    const user = await User.findOne(
      { _id: product.ownerId._id },
      { acc_no: 1, _id: 0 }
    );
    
    const connectedAccountId = user?.acc_no?.toString()
    // Save payment to DB
    const newPayment = await Payment.create({
      item_id: product._id,
      owner_id: product.ownerId._id,
      amount:  totalPrice,
      transfer_amount: product.pricePerDay,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "aud",
            product_data: {
              name: product.title,
            },
            unit_amount: Math.round(totalPrice* 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      customer_email: email,
      metadata: {
        payment_id: newPayment._id.toString(),
        startDate:startDate,
          endDate:endDate
      },
      payment_intent_data: {
        application_fee_amount: Math.round(product.platformFee * 100 || 0), // Optional platform fee
        transfer_data: {
          destination: connectedAccountId, // Connected account ID
        },
      },
    });

  res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe session error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
 


export const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    // ✅ Use raw body here
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('❌ Stripe webhook verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

 if (event.type === 'checkout.session.completed') {
  const session = event.data.object;
  const email = session.customer_email;
  const paymentIntentId = session.payment_intent;
  const ongoingPayment = session.metadata.payment_id;
  const startDate = session.metadata.startDate;
  const endDate = session.metadata.endDate;
  const amount_total = session.amount_total / 100; // Correct source
  const status = session.payment_status;


  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.error("User not found for email:", email);
      return;
    }

    const completePayment = await Payment.findOneAndUpdate(
      { _id: ongoingPayment },
      {
        $set: {
          rentee_id: user._id,
          transection_id: paymentIntentId,
          status: status
        }
      },
      { new: true }
    );

    if (!completePayment) {
      console.error("Payment not found for ID:", ongoingPayment);
      return;
    }

    if (status === 'paid') {
      await Rental.create({
        itemId: completePayment.item_id,
        renterId: user._id,
        ownerId: completePayment.owner_id,
        startDate: startDate,
        endDate: endDate,
        status: status,
        totalAmount: amount_total
      });
    }
  } catch (err) {
   res.status(500).json({
    success:false,
    message:err.message
   })
  }
}


  res.status(200).json({ received: true });
};

export const createListerAccount=async(req,res)=>{
  const{firstName,lastName,email}=req.body
try{
  const account=await stripe.accounts.create({
    type: "custom", // or 'standard'
    country: "AU",
    individual: {
  
      first_name: firstName,
  
      last_name: lastName,
  
      email: email,
  
      phone: "+15555555555",
  
      dob: {
  
        day: 1,
  
        month: 1,
  
        year: 1990
  
      }
    },
  
    business_type: "individual",
  
    capabilities: {
  
      card_payments: { requested: true },
  
      transfers: { requested: true }
    }, 
    business_profile: {
      url: "https://rajneesh-insta-clone.netlify.app/",
      product_description: "Peer-to-peer rental marketplace for tools, electronics, and more.",
      support_phone: "+15551234567",
      mcc: "7399" // Miscellaneous business services
    },
   external_account: {
  object: "bank_account",
  country: "AU",
  currency: "aud",
  account_holder_name: `${firstName} ${lastName}`,
  account_holder_type: "individual",
  routing_number: "110000",  // Replace with the actual routing number
  account_number: "000123456"  // Replace with the actual account number
  },
    tos_acceptance: {
      date: Math.floor(Date.now() / 1000),
      ip: "203.0.113.42" // e.g., '203.0.113.42'
    },
  
  
  })
  await User.updateOne({email},{$set:{acc_no:account.id}})
  res.status(200).json({
    success:true,
    account
  })
}
catch(err){
res.status(500).json({
  success:false,
  message:err.message
})
}
}

export const updateConnectedAccount=async (req,res)=> {

const {accountId}=req.params
  try {
    const updatedAccount = await stripe.accounts.update(accountId,req.body);
    res.status(200).json({ updatedAccount});
  } catch (error) {
    throw error
  }
}

export const listerPayout=async(req,res)=>{
  try{
    const {email } = req.body;
    const user = await User.findOne(
      { email },
      { acc_no: 1, _id: 0 }
    );
    
    const connectedAccountId = user?.acc_no?.toString()
    
    const payout = await stripe.payouts.create(
      {
        amount: 1, 
        currency: 'aud',
      },
      {
        stripeAccount: connectedAccountId, 
      }
    );
    res.status(200).json({
      success:true,
      payout
    })
  }catch(error){
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}


export const getConnectedAccountBalance=async(req,res)=> {
  try {
    const {email } = req.params;
    const user = await User.findOne(
      { email },
      { acc_no: 1, _id: 0 }
    );
    
    const connectedAccountId = user?.acc_no?.toString()
    if (!connectedAccountId) {
      throw new Error('Connected account ID is required.');
    }
    const balance = await stripe.balance.retrieve({
      stripeAccount: connectedAccountId,
    });

    res.status(200).json({
      success:true,
      balance
    });
  } catch (error) {
   res.status(500).json({
    success:false,
    message:error.message
   })
  }
}

export const getUserTransection=async(req,res)=>{
  const {email}=req.params
  try{
 const user=await User.find({email:email})

    const payments = await Payment.find({ rentee_id: user[0]._id })
      .populate('item_id')
      .populate('owner_id', 'name email');
    res.status(200).json(payments);
  }catch(err){
    res.status(500).json({
      success:false,
      err:err.message
    })
  }
}

