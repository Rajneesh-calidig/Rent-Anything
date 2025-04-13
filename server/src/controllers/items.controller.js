import Item from "../models/item.js"

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

export const searchItems = async (req,res) => {
  
}
