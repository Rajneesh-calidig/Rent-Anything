import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Upload, Trash, X } from "lucide-react";
import { useItem } from "../../../providers/Items/ItemProvider";
import {
  Camera,
  Sofa,
  Dumbbell,
  Wrench,
  Music,
  Laptop,
  Car,
  Shirt,
  BookOpen,
  Utensils,
  Tent,
  Gamepad,
  Plus,
  ChevronDown,
  FileQuestion,
} from "lucide-react";
import { useLoader } from "../../../providers/Loader/LoaderProvider";

const EditMyItem = ({
  setShowEditModal,
  editItemData,
  setEditItemData,
  newImages,
  setEditItemId,
  setNewImages,
  setImagesToDelete,
  imagesToDelete,
}) => {
  const [activeImageTab, setActiveImageTab] = useState(0);
  const [imagePreview, setImagePreview] = useState([...editItemData?.images]);
  // const categories = [
  //   {
  //     name: "Electronics",
  //     icon: <Camera className="w-5 h-5" />,
  //     subcategories: [
  //       "Cameras",
  //       "Audio Equipment",
  //       "Computers",
  //       "TVs",
  //       "Gaming Consoles",
  //       "Drones",
  //     ],
  //   },
  //   {
  //     name: "Furniture",
  //     icon: <Sofa className="w-5 h-5" />,
  //     subcategories: [
  //       "Sofas",
  //       "Beds",
  //       "Tables",
  //       "Chairs",
  //       "Storage",
  //       "Outdoor Furniture",
  //     ],
  //   },
  //   {
  //     name: "Sports",
  //     icon: <Dumbbell className="w-5 h-5" />,
  //     subcategories: [
  //       "Fitness Equipment",
  //       "Bicycles",
  //       "Water Sports",
  //       "Winter Sports",
  //       "Team Sports",
  //       "Golf",
  //     ],
  //   },
  //   {
  //     name: "Tools",
  //     icon: <Wrench className="w-5 h-5" />,
  //     subcategories: [
  //       "Power Tools",
  //       "Hand Tools",
  //       "Garden Tools",
  //       "Ladders",
  //       "Pressure Washers",
  //       "Generators",
  //     ],
  //   },
  //   {
  //     name: "Vehicles",
  //     icon: <Car className="w-5 h-5" />,
  //     subcategories: [
  //       "Cars",
  //       "Motorcycles",
  //       "Bicycles",
  //       "Scooters",
  //       "Boats",
  //       "Trailers",
  //     ],
  //   },
  //   {
  //     name: "Clothing",
  //     icon: <Shirt className="w-5 h-5" />,
  //     subcategories: [
  //       "Formal Wear",
  //       "Costumes",
  //       "Designer Items",
  //       "Accessories",
  //       "Shoes",
  //       "Jewelry",
  //     ],
  //   },
  //   {
  //     name: "Books",
  //     icon: <BookOpen className="w-5 h-5" />,
  //     subcategories: [
  //       "Textbooks",
  //       "Fiction",
  //       "Non-Fiction",
  //       "Comics",
  //       "Magazines",
  //       "Rare Books",
  //     ],
  //   },
  //   {
  //     name: "Outdoor",
  //     icon: <Tent className="w-5 h-5" />,
  //     subcategories: [
  //       "Camping Gear",
  //       "Hiking Equipment",
  //       "Beach Items",
  //       "Gardening",
  //       "Patio Furniture",
  //       "Grills",
  //     ],
  //   },
  //   {
  //     name: "Others",
  //     icon: <FileQuestion className="w-5 h-5" />,
  //     subcategories: ["Miscellaneous", "Uncategorized"],
  //   },
  // ];
  // const conditionOptions = [
  //   "Brand New",
  //   "Like New",
  //   "Excellent",
  //   "Good",
  //   "Fair",
  //   "Acceptable",
  // ];
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newFiles = files.slice(0, 5 - imagePreview.length);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreview([...imagePreview, ...newPreviews]);
      setEditItemData({
        ...editItemData,
        itemsImages: editItemData?.itemsImages
          ? [...editItemData?.itemsImages, ...newFiles]
          : [...newFiles],
      });
    }
  };

  const { deleteImage, updateItem } = useItem();
  const loader = useLoader();
  const handleRemoveImage = async (index, isNew = false) => {
    const name = imagePreview[index];
    if (name[0] === "/") {
      try {
        loader.start();
        const res = await deleteImage(name, editItemData._id);
        if (res.status === 200) {
          setImagePreview((prevImage) => {
            return prevImage.filter((img) => img !== name);
          });
          console.log(editItemData);
          const updatedImages = editItemData.images.filter(
            (img) => img !== name
          );
          setEditItemData({ ...editItemData, images: [...updatedImages] });
          toast.success("Image Deleted Sucessfully!");
        }
      } catch (err) {
        console.error(err);
        toast.error(err);
      } finally {
        loader.stop();
      }
    } else {
      setImagePreview((prevState) => {
        return prevState.filter((img) => img !== name);
      });
      const updatedItemImages = [...editItemData.itemsImages];
      updatedItemImages.splice(index - editItemData.images.length, 1);
      setEditItemData({ ...editItemData, itemsImages: updatedItemImages });
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(editItemData).forEach((key) => {
      if (key !== "images") {
        formData.append(key, editItemData[key]);
      }
    });

    formData.append("existingImages", JSON.stringify(editItemData.images));

    formData.append("imagesToDelete", JSON.stringify(imagesToDelete));

    newImages.forEach((image, index) => {
      formData.append(`newImage${index}`, image.file);
    });

    setShowEditModal(false);
    setEditItemId(null);
  };

  // const { updateItem } = useItem();
  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      loader.start();
      console.log(editItemData);
      const formData = new FormData();

      for (const key in editItemData) {
        if (key === "itemsImages") {
          editItemData.itemsImages.forEach((image) => {
            formData.append("itemsImages", image);
          });
        } else if (
          key === "_id" ||
          key === "createdAt" ||
          key === "updatedAt"
        ) {
          continue;
        } else {
          formData.append(key, editItemData[key]);
        }
      }
      console.log(formData);
      const response = await updateItem(editItemData._id, formData);
      if (response.status === 200) {
        toast.success("Updated Successfully!");
        setShowEditModal(false);
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response.data);
    } finally {
      loader.stop();
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Edit Item</h2>
          <button
            onClick={() => setShowEditModal(false)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleUpdateItem} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={editItemData.title}
                  onChange={(e) =>
                    setEditItemData({ ...editItemData, title: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={editItemData.category}
                  onChange={(e) =>
                    setEditItemData({
                      ...editItemData,
                      category: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  <option value="">Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="sports">Sports</option>
                  <option value="tools">Tools</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="clothing">Clothing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subcategory
                </label>
                <input
                  type="text"
                  name="subCategory"
                  value={editItemData.subCategory}
                  onChange={(e) =>
                    setEditItemData({
                      ...editItemData,
                      subCategory: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Per Day (₹)
                </label>
                <input
                  type="number"
                  name="pricePerDay"
                  value={editItemData.pricePerDay}
                  onChange={(e) =>
                    setEditItemData({
                      ...editItemData,
                      pricePerDay: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Condition
                </label>
                <input
                  type="text"
                  name="condition"
                  value={editItemData.condition}
                  onChange={(e) =>
                    setEditItemData({
                      ...editItemData,
                      condition: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={editItemData.brand}
                  onChange={(e) =>
                    setEditItemData({
                      ...editItemData,
                      brand: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  value={editItemData.model}
                  onChange={(e) =>
                    setEditItemData({
                      ...editItemData,
                      model: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={editItemData.location}
                  onChange={(e) =>
                    setEditItemData({
                      ...editItemData,
                      location: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  available
                </label>
                <input
                  type="text"
                  name="available"
                  value={editItemData.available}
                  onChange={(e) =>
                    setEditItemData({
                      ...editItemData,
                      available: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editItemData.description}
                  onChange={(e) =>
                    setEditItemData({
                      ...editItemData,
                      description: e.target.value,
                    })
                  }
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={editItemData.status}
                  onChange={(e) =>
                    setEditItemData({ ...editItemData, status: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Image Management Section */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Manage Images
              </h3>

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Images
                </h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="image-upload"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {imagePreview.length > 0 ? (
                    <div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
                        {imagePreview.map((src, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={
                                src[0] === "/"
                                  ? `${import.meta.env.VITE_FILE_URL}${src}`
                                  : src
                              }
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}

                        {imagePreview.length < 5 && (
                          <label
                            htmlFor="image-upload"
                            className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                          >
                            <Plus className="w-8 h-8 text-gray-400" />
                            <span className="text-sm text-gray-500">
                              Add More
                            </span>
                          </label>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {imagePreview.length}/5 images uploaded.{" "}
                        {imagePreview.length < 5
                          ? `You can add ${5 - imagePreview.length} more.`
                          : "Maximum limit reached."}
                      </p>
                    </div>
                  ) : (
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <Upload className="w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-gray-700 font-medium">
                        Drag and drop images or click to upload
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Upload up to 5 high-quality images (Max 5MB each)
                      </p>
                    </label>
                  )}

                  {/* {errors.images && (
                    <p className="mt-3 text-sm text-red-500 error-message">
                      {errors.images}
                    </p>
                  )} */}
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-4 border-t">
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-colors"
                // onClick={handleUpdateItem}
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMyItem;
