// models/Review.js
import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: [1, 'Rating must be between 1 and 5'],
    max: [5, 'Rating must be between 1 and 5'],
  },
  comment: {
    type: String,
    maxlength: 1000,
  },
}, {
  timestamps: true,
  versionKey: false,
});

reviewSchema.index({ itemId: 1, userId: 1 }, { unique: true }); // 1 review per user per item

const Review = mongoose.model('Review', reviewSchema);

export default Review
