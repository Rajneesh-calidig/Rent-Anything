import Review from "../models/review.js";
import Rental from "../models/rental.js";

export const createReview = async (req, res) => {
  try {
    const { itemId, rating, comment } = req.body;
    const rental = await Rental.findOne({ itemId, renterId: req.user.userId });
    if (!rental)
      return res
        .status(403)
        .json({ message: "You can only review rented items." });

    const reviewExists = await Review.findOne({
      itemId,
      userId: req.user.userId,
    });
    if (reviewExists)
      return res
        .status(400)
        .json({ message: "You have already reviewed this item." });

    const review = new Review({
      itemId,
      userId: req.user.userId,
      rating,
      comment,
    });
    await review.save();
    res.status(200).json(review);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "You’ve already reviewed this item." });
    }

    res
      .status(500)
      .json({
        message: "Failed to create/update review",
        error: error.message,
      });
  }
};

export const getReviewsByItem = async (req, res) => {
  try {
    const reviews = await Review.find({ itemId: req.params.itemId }).populate(
      "userId",
      "name profileImage"
    );
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.userId.toString() !== req.user.userId)
      return res.status(403).json({ message: "Unauthorized" });

    await review.deleteOne();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
