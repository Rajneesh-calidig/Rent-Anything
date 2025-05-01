import Item from "../models/item.js";
import Rental from "../models/rental.js";
import Review from "../models/review.js";
import mongoose from "mongoose";

export const createItem = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    const itemsImages = req.files.map(
      (file) => `/public/images/itemImages/${file.filename}`
    );
    const newItem = new Item({
      ...req.body,
      ownerId: req.user.userId,
      images: itemsImages,
    });
    const savedItem = await newItem.save();
    res.status(201).json({ success: true, savedItem });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const avgRating = await Review.aggregate([
      {
        $group: {
          _id: "$itemId",
          avgRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    const ratingsMap = {};
    avgRating.forEach((r) => {
      ratingsMap[r._id.toString()] = {
        avgRating: r.avgRating,
        totalReviews: r.totalReviews,
      };
    });

    const items = await Item.find().populate("ownerId", "name email");

    const itemWithRatings = items.map((item) => {
      const ratingInfo = ratingsMap[item._id.toString()] || {
        avgRating: 0,
        totalReviews: 0,
      };
      return {
        ...item.toObject(),
        avgRating: Number(ratingInfo.avgRating.toFixed(1)),
        totalReviews: ratingInfo.totalReviews,
      };
    });

    res.status(200).json({ success: true, data: itemWithRatings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate(
      "ownerId",
      "name email createdAt profileImage"
    );

    const { id } = req.params;

    const avgRating = await Review.aggregate([
      {
        $match: {
          itemId: new mongoose.Types.ObjectId(id), // make sure id is ObjectId if your itemId is stored as ObjectId
        },
      },
      {
        $group: {
          _id: "$itemId",
          avgRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    const ratingInfo = avgRating[0] || { avgRating: 0, totalReviews: 0 };

    const itemWithRating = {
      ...item.toObject(),
      avgRating: Number(ratingInfo.avgRating.toFixed(1)),
      totalReviews: ratingInfo.totalReviews,
    };

    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(itemWithRating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ ownerId: req.params.userId }).populate(
      "ownerId",
      "name email"
    );
    if (!items)
      return res.status(404).json({ message: "No items found for this user" });
    res.status(200).json({ message: "success", data: items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    if (item.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    Object.assign(item, req.body);
    const updatedItem = await item.save();
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    if (item.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await item.deleteOne();
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchItems = async (req, res) => {
  try {
    const {
      location,
      category,
      minPrice,
      maxPrice,
      rating,
      sortBy,
      startDate,
      endDate,
      keyword,
      includeUnavailableItems,
    } = req.query;

    const avgRating = await Review.aggregate([
      {
        $group: {
          _id: "$itemId",
          avgRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    const ratingsMap = {};
    avgRating.forEach((r) => {
      ratingsMap[r._id.toString()] = {
        avgRating: r.avgRating,
        totalReviews: r.totalReviews,
      };
    });
    // console.log(location,category,sortBy,minPrice,maxPrice,rating,startDate,endDate,keyword)
    let notAvailableProducts = [];
    if (includeUnavailableItems !== "true" && startDate && endDate) {
      notAvailableProducts = await Rental.find({
        $or: [
          { startDate: { $gte: new Date(startDate), $lte: new Date(endDate) } },
          { endDate: { $gte: new Date(startDate), $lte: new Date(endDate) } },
        ],
      }).distinct("itemId");
    }

    const query = {
      $and: [
        {
          pricePerDay: {
            $gte: Number(minPrice || 0),
            $lte: Number(maxPrice || 5000),
          },
        },
      ],
    };

    if (keyword) {
      query.$and.push({
        $or: [
          { title: { $regex: keyword || "", $options: "i" } },
          { description: { $regex: keyword || "", $options: "i" } },
        ],
      });
    }

    if (location) {
      query.$and.push({
        location: { $regex: location || "", $options: "i" },
      });
    }

    if (category?.length > 0 && category[0] !== "All") {
      query.$and.push({
        category: { $in: Array.isArray(category) ? category : [category] },
      });
    }

    // if (rating > 0) {
    //   // This assumes you have a way to calculate/query ratings
    //   // You might need to adjust this based on your actual rating system
    //   query.$and.push({
    //     averageRating: { $gte: Number(rating) }
    //   });
    // }

    if (startDate && endDate) {
      query.$and.push({
        _id: { $nin: notAvailableProducts },
      });
    }

    let dbQuery = Item.find(query).populate("ownerId", "name email");

    if (sortBy) {
      switch (sortBy) {
        case "price-asc":
          dbQuery = dbQuery.sort({ pricePerDay: 1 });
          break;
        case "price-desc":
          dbQuery = dbQuery.sort({ pricePerDay: -1 });
          break;
        case "newest":
          dbQuery = dbQuery.sort({ createdAt: -1 });
          break;
        default:
          dbQuery = dbQuery.sort({ createdAt: -1 });
      }
    }

    const items = await dbQuery;

    let itemWithRatings = items.map((item) => {
      const ratingInfo = ratingsMap[item._id.toString()] || {
        avgRating: 0,
        totalReviews: 0,
      };
      return {
        ...item.toObject(),
        avgRating: Number(ratingInfo.avgRating.toFixed(1)),
        totalReviews: ratingInfo.totalReviews,
      };
    });

    if (sortBy === "rating") {
      itemWithRatings = itemWithRatings.sort(
        (a, b) => b.avgRating - a.avgRating
      );
    }

    res.status(200).json({ success: true, data: itemWithRatings });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
