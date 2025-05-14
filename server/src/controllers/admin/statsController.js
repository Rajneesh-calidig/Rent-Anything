import User from '../../models/User.js';
import Item from '../../models/item.js';
import Review from '../../models/review.js';

export const getAdminStats = async (req, res) => {
  try {
    // User counts
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const inactiveUsers = totalUsers - activeUsers;

    // Item counts
    const totalItems = await Item.countDocuments();
    const availableItems = await Item.countDocuments({ isAvailable: true });
    const unavailableItems = totalItems - availableItems;

    // Review stats
    const totalReviews = await Review.countDocuments();
    const ratingStats = await Review.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' }
        }
      }
    ]);

    const avgRating = ratingStats[0]?.avgRating || 0;

    res.status(200).json({
      users: {
        total: totalUsers,
        active: activeUsers,
        inactive: inactiveUsers
      },
      items: {
        total: totalItems,
        available: availableItems,
        unavailable: unavailableItems
      },
      reviews: {
        total: totalReviews,
        averageRating: parseFloat(avgRating.toFixed(2))
      }
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Server error fetching statistics' });
  }
};
