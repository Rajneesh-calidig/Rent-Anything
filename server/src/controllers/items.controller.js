import Item from "../models/item.js"
import Rental from "../models/rental.js";

export const createItem = async (req, res) => {
  try {

    if(!req.files || req.files.length === 0){
      return res.status(400).json({ message: 'At least one image is required' });
    }

    const itemsImages = req.files.map(file => (`/public/images/itemImages/${file.filename}`));
    const newItem = new Item({
      ...req.body,
      ownerId: req.user.userId,
      images:itemsImages,
    });
    const savedItem = await newItem.save();
    res.status(201).json({success:true,savedItem});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('ownerId', 'name email');
    res.status(200).json({success:true,data:items});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('ownerId', 'name email');
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
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
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await item.deleteOne();
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchItems = async (req, res) => {
  try {
    const { 
      location,category,minPrice,maxPrice,rating,sortBy,startDate,endDate,keyword,includeUnavailableItems
    } = req.query;
    // console.log(location,category,sortBy,minPrice,maxPrice,rating,startDate,endDate,keyword)
    let notAvailableProducts = [];
    if((includeUnavailableItems !== "true") && startDate && endDate){
      notAvailableProducts = await Rental.find({
        $or: [
          {startDate: {$gte: new Date(startDate), $lte: new Date(endDate)}},
          {endDate: {$gte: new Date(startDate), $lte: new Date(endDate)}}
        ]
      }).distinct('itemId');
    }

    const query = {
      $and: [
        { pricePerDay: { $gte: Number(minPrice || 0), $lte: Number(maxPrice || 5000) } }
      ]
    };

    if (keyword) {
      query.$and.push({
        $or: [
          { title: { $regex: keyword || "", $options: 'i' } },
          { description: { $regex: keyword || "", $options: 'i' } }
        ]
      });
    }

    if (location) {
      query.$and.push({
        location: { $regex: location || "", $options: 'i' }
      });
    }

    if (category?.length > 0 && category[0] !== "All") {
      query.$and.push({
        category: { $in: Array.isArray(category) ? category : [category] }
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
        _id: { $nin: notAvailableProducts }
      });
    }

    let dbQuery = Item.find(query).populate('ownerId', 'name email');

    if (sortBy) {
      switch (sortBy) {
        case 'price-asc':
          dbQuery = dbQuery.sort({ pricePerDay: 1 });
          break;
        case 'price-desc':
          dbQuery = dbQuery.sort({ pricePerDay: -1 });
          break;
        case 'rating':
          dbQuery = dbQuery.sort({ averageRating: -1 });
          break;
        case 'newest':
          dbQuery = dbQuery.sort({ createdAt: -1 });
          break;
        default:
          dbQuery = dbQuery.sort({ createdAt: -1 });
      }
    }

    const items = await dbQuery;
    res.status(200).json({ success: true,data:items});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};