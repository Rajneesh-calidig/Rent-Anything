import express from "express";
import { protectRoute } from "../../middleware/protectRoute.js";
import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  searchItems,
  getMyItems,
  deleteImage,
} from "../../controllers/items.controller.js";
import { uploadItemsImages } from "../../middleware/upload.js";

const router = express.Router();

router.post(
  "/",
  protectRoute,
  uploadItemsImages.array("itemsImages", 5),
  createItem
);
router.get("/", getAllItems);
router.get("/my-items/:userId", protectRoute, getMyItems);
router.get("/search", searchItems);
router.get("/:id", getItemById);
router.put(
  "/:id",
  protectRoute,
  uploadItemsImages.array("itemsImages", 5),
  updateItem
);
router.put("/:id/image/delete", protectRoute, deleteImage);
router.delete("/:id", protectRoute, deleteItem);

export default router;
