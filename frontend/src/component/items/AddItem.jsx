import { useState } from "react";
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
  X,
  Upload,
  ChevronDown,
  FileQuestion,
} from "lucide-react";
import { useItem } from "../../providers/Items/ItemProvider";
import { toast } from "react-toastify";

export default function AddItem() {
  // State for form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    subCategory: "",
    brand: "",
    model: "",
    condition: "Good",
    pricePerDay: "",
    // pricePerWeek: "",
    // pricePerMonth: "",
    securityDeposit: "",
    location: "",
    images: [],
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const { addItem } = useItem();

  const categories = [
    {
      name: "Electronics",
      icon: <Camera className="w-5 h-5" />,
      subcategories: [
        "Cameras",
        "Audio Equipment",
        "Computers",
        "TVs",
        "Gaming Consoles",
        "Drones",
      ],
    },
    {
      name: "Furniture",
      icon: <Sofa className="w-5 h-5" />,
      subcategories: [
        "Sofas",
        "Beds",
        "Tables",
        "Chairs",
        "Storage",
        "Outdoor Furniture",
      ],
    },
    {
      name: "Sports",
      icon: <Dumbbell className="w-5 h-5" />,
      subcategories: [
        "Fitness Equipment",
        "Bicycles",
        "Water Sports",
        "Winter Sports",
        "Team Sports",
        "Golf",
      ],
    },
    {
      name: "Tools",
      icon: <Wrench className="w-5 h-5" />,
      subcategories: [
        "Power Tools",
        "Hand Tools",
        "Garden Tools",
        "Ladders",
        "Pressure Washers",
        "Generators",
      ],
    },
    {
      name: "Vehicles",
      icon: <Car className="w-5 h-5" />,
      subcategories: [
        "Cars",
        "Motorcycles",
        "Bicycles",
        "Scooters",
        "Boats",
        "Trailers",
      ],
    },
    {
      name: "Clothing",
      icon: <Shirt className="w-5 h-5" />,
      subcategories: [
        "Formal Wear",
        "Costumes",
        "Designer Items",
        "Accessories",
        "Shoes",
        "Jewelry",
      ],
    },
    {
      name: "Books",
      icon: <BookOpen className="w-5 h-5" />,
      subcategories: [
        "Textbooks",
        "Fiction",
        "Non-Fiction",
        "Comics",
        "Magazines",
        "Rare Books",
      ],
    },
    {
      name: "Outdoor",
      icon: <Tent className="w-5 h-5" />,
      subcategories: [
        "Camping Gear",
        "Hiking Equipment",
        "Beach Items",
        "Gardening",
        "Patio Furniture",
        "Grills",
      ],
    },
    {
      name: "Others",
      icon: <FileQuestion className="w-5 h-5" />,
      subcategories: ["Miscellaneous", "Uncategorized"],
    },
  ];

  // Condition options
  const conditionOptions = [
    "Brand New",
    "Like New",
    "Excellent",
    "Good",
    "Fair",
    "Acceptable",
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear errors when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    // Update form data
    setFormData({
      ...formData,
      [name]: value,
    });

    // Update subcategories when category changes
    if (name === "category") {
      const selectedCategory = categories.find((cat) => cat.name === value);
      setSubcategories(selectedCategory ? selectedCategory.subcategories : []);

      // Reset subcategory when category changes
      setFormData({
        ...formData,
        category: value,
        subCategory: "",
      });
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      // Limit to 5 images
      const newFiles = files.slice(0, 5 - formData.images.length);

      // Create preview URLs
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

      setImagePreview([...imagePreview, ...newPreviews]);
      setFormData({
        ...formData,
        images: [...formData.images, ...newFiles],
      });
    }
  };

  // Remove image
  const removeImage = (index) => {
    const updatedImages = [...formData.images];
    const updatedPreviews = [...imagePreview];

    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setFormData({
      ...formData,
      images: updatedImages,
    });
    setImagePreview(updatedPreviews);
  };

  // Calculate weekly and monthly prices based on daily price
  const calculatePrices = (dailyPrice) => {
    if (!dailyPrice || isNaN(dailyPrice)) return;

    const weekly = Math.round(dailyPrice * 6.5); // 7 days with discount
    const monthly = Math.round(dailyPrice * 25); // 30 days with discount

    setFormData({
      ...formData,
      pricePerDay: dailyPrice,
      // pricePerWeek: weekly,
      // pricePerMonth: monthly,
      securityDeposit: Math.round(dailyPrice * 5), // Default securityDeposit is 5x daily rate
    });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.subCategory)
      newErrors.subCategory = "Subcategory is required";
    if (!formData.pricePerDay)
      newErrors.pricePerDay = "Daily price is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (formData.images.length === 0)
      newErrors.images = "At least one image is required";

    // Price validation
    if (
      formData.pricePerDay &&
      (isNaN(formData.pricePerDay) || formData.pricePerDay <= 0)
    ) {
      newErrors.pricePerDay = "Please enter a valid price";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = document.querySelector(".error-message");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    try {
      const data = new FormData();

      console.log(formData);
      // Append all fields to FormData
      for (const key in formData) {
        if (key === "images") {
          formData.images.forEach((image) => {
            data.append("itemsImages", image); // 'itemsImages' matches the multer field name
          });
        } else {
          data.append(key, formData[key]);
        }
      }

      // Send data to backend
      const response = await addItem(data);

      // const result = await response.json();

      // if (!response.ok) {
      //   throw new Error(result.message || "Failed to create item");
      // }

      toast.success("Item added successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        subCategory: "",
        brand: "",
        model: "",
        condition: "Good",
        pricePerDay: "",
        // pricePerWeek: "",
        // pricePerMonth: "",
        securityDeposit: "",
        location: "",
        images: [],
      });
      setImagePreview([]);
      setSubcategories([]);
    } catch (error) {
      console.error("Error creating item:", error.message);
      toast.error("Error creating item: " + error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-md p-6">
        {/* <h1 className="text-2xl font-bold text-gray-800 mb-6">Add a New Item for Rent</h1> */}

        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder="e.g., Professional DSLR Camera with 3 Lenses"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500 error-message">
                    {errors.title}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full p-2 border ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder="Describe your item in detail, including its features, condition, and any other relevant information."
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500 error-message">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full p-2 pl-9 border ${
                      errors.category ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none`}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    {formData.category ? (
                      categories.find((cat) => cat.name === formData.category)
                        ?.icon
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500 error-message">
                    {errors.category}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subcategory <span className="text-red-500">*</span>
                </label>
                <select
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  disabled={!formData.category}
                  className={`w-full p-2 border ${
                    errors.subCategory ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                    !formData.category ? "bg-gray-100" : ""
                  }`}
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((subcat) => (
                    <option key={subcat} value={subcat}>
                      {subcat}
                    </option>
                  ))}
                </select>
                {errors.subCategory && (
                  <p className="mt-1 text-sm text-red-500 error-message">
                    {errors.subCategory}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="e.g., Canon, IKEA, Nike"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="e.g., EOS 5D Mark IV, POÄNG"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Condition
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  {conditionOptions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder="e.g., Mumbai, Maharashtra"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500 error-message">
                    {errors.location}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Daily Price (₹) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="pricePerDay"
                    value={formData.pricePerDay}
                    onChange={(e) => {
                      handleChange(e);
                      calculatePrices(e.target.value);
                    }}
                    min="0"
                    className={`w-full p-2 pl-8 border ${
                      errors.pricePerDay ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                    placeholder="0"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">₹</span>
                  </div>
                </div>
                {errors.pricePerDay && (
                  <p className="mt-1 text-sm text-red-500 error-message">
                    {errors.pricePerDay}
                  </p>
                )}
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weekly Price (₹)</label>
                <div className="relative">
                  <input
                    type="number"
                    name="pricePerWeek"
                    value={formData.pricePerWeek}
                    onChange={handleChange}
                    min="0"
                    className="w-full p-2 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="0"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">₹</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Suggested: ₹{formData.pricePerDay ? Math.round(formData.pricePerDay * 6.5) : 0}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Price (₹)</label>
                <div className="relative">
                  <input
                    type="number"
                    name="pricePerMonth"
                    value={formData.pricePerMonth}
                    onChange={handleChange}
                    min="0"
                    className="w-full p-2 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="0"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">₹</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Suggested: ₹{formData.pricePerDay ? Math.round(formData.pricePerDay * 25) : 0}
                </p>
              </div> */}

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Security Deposit (₹)</label>
                <div className="relative">
                  <input
                    type="number"
                    name="securityDeposit"
                    value={formData.securityDeposit}
                    onChange={handleChange}
                    min="0"
                    className="w-full p-2 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="0"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">₹</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Suggested: ₹{formData.pricePerDay ? Math.round(formData.pricePerDay * 5) : 0}
                </p>
              </div> */}
            </div>
          </div>

          {/* Images */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Images</h2>
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
                          src={src || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
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
                        <span className="text-sm text-gray-500">Add More</span>
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

              {errors.images && (
                <p className="mt-3 text-sm text-red-500 error-message">
                  {errors.images}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
