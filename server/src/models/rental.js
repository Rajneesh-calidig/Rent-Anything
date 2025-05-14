// models/Rental.js
import mongoose, { Schema } from "mongoose";

const rentalSchema = new Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  renterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', "paid", 'cancelled'],
    default: 'pending',
  },
  totalAmount: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

rentalSchema.index({ renterId: 1, itemId: 1 });

const Rental = mongoose.model('Rental', rentalSchema);

export default Rental
