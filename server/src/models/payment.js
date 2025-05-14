import mongoose, { Schema } from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    // Razorpay transaction details
   transection_id:{
    type:String
   },

    // Razorpay Linked Account (to whom money is transferred)
    owner_razorpay_account_id: {
      type: String, // acc_xxxxxxxxxx
      required: false,
    },

    // References to your app's data
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: false,
    },
    rentee_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },

    // Financials
    amount: {
      type: Number,
      required: true,
    },
    transfer_amount: {
      type: Number,
      required: true,
    },

    // Payout details (optional but helpful)
    payout_id: {
      type: String, // if you manually transfer via payout API
    },
    payout_status: {
      type: String,
      enum: ['pending', 'processed', 'failed'],
      default: 'pending',
    },

    // Status of this record
    status: {
      type: String,
      // enum: ['pending', 'success', 'failure'],
      default: 'pending',
    },

    notes: {
      type: Map,
      of: String,
      default: {},
    },

    paid_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const payment=mongoose.model('Payment',paymentSchema);

export default payment
