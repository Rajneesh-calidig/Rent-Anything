import Rental from '../models/rental.js';
import Item from '../models/item.js';
import User from "../models/User.js"

export const createRental = async (req, res) => {
  try {
    const { itemId, startDate, endDate } = req.body;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (!item.available) return res.status(400).json({ message: 'Item is not available' });
    if (item.ownerId.toString() === req.user.id) return res.status(400).json({ message: 'Cannot rent your own item' });

    const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    const totalAmount = Math.ceil(days) * item.pricePerDay;

    const rental = new Rental({
      itemId,
      renterId: req.user.id,
      ownerId: item.ownerId,
      startDate,
      endDate,
      totalAmount,
      status: 'pending',
    });

    await rental.save();
    res.status(201).json(rental);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyRentals = async (req, res) => {
  try {
    const rentals = await Rental.find({ renterId: req.user.id })
      .populate('itemId')
      .populate('ownerId', 'name email');
    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRentalsForMyItems = async (req, res) => {
  const {email}=req.params
  try {
    const user=await User.find({email:email})
// console.log("user is",user)

    const rentals = await Rental.find({ renterId: user[0]._id })
      .populate('itemId')
      .populate('ownerId', 'name email');
console.log("user is",rentals)

    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRentalStatus = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).json({ message: 'Rental not found' });
    if (rental.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    rental.status = req.body.status;
    await rental.save();
    res.status(200).json(rental);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

