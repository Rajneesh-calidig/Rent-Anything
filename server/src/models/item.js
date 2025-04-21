import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Item title is required'],
    trim: true,
  },
  description: {
    type: String,
    maxlength: 1000,
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Furniture', 'Books', 'Vehicles', 'Clothing', 'Sports','Outdoor','Tools','Others'],
  },
  subCategory: {
    type:String,
  },
  brand:{
    type:String,
  },
  model:{
    type:String
  },
  pricePerDay: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative'],
  },
  condition:{
    type:String,
    enum: ['Like New','Good','Brand New','Excellent','Fair','Acceptable'],
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  available: {
    type: Boolean,
    default: true,
  },
  location: {
    type: String,
    trim: true,
  },
}, {  
  timestamps: true,
  versionKey: false,
});

itemSchema.index({ title: 'text', description: 'text',location:'text' }); // For search

const Item = mongoose.model('Item', itemSchema);

export default Item
