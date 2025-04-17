import Review from '../models/review.js';
import Rental from '../models/rental.js';

export const createReview = async (req, res) => {
  try {
    const { itemId, rating, comment} = req.body;
    const userId = req.user._id; // assuming you're using auth middleware

    if (!rating || !itemId) {
      return res.status(400).json({ message: "Item ID and rating are required." });
    }

    // Check if the user already reviewed the item
    const existingReview = await Review.findOne({ itemId, userId });

    if (existingReview) {
      // Update the existing review
      existingReview.rating = rating;
      existingReview.comment = comment;
      await existingReview.save();
      return res.status(200).json({ message: "Review updated successfully.", review: existingReview });
    }

    // Create a new review
    const newReview = await Review.create({
      itemId,
      userId,
      rating,
      comment
    });

    res.status(201).json({ message: "Review created successfully.", review: newReview });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "You’ve already reviewed this item." });
    }

    res.status(500).json({ message: "Failed to create/update review", error: error.message });
  }
};

export const getReviewsByItem = async (req, res) => {
  try {
    const reviews = await Review.find({ itemId: req.params.itemId }).populate('userId', 'name');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    await review.deleteOne();
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
