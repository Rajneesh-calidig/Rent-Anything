"use client"

import { useState, useEffect } from "react"
import {Link} from "react-router-dom"

function App() {
  // State for items
  const [items, setItems] = useState([])
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  // State for form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    pricePerDay: "",
    location: "",
    available: true,
  })
  // State for form errors
  const [formErrors, setFormErrors] = useState({})
  // State for form submission error
  const [submissionError, setSubmissionError] = useState("")
  // State for images
  const [images, setImages] = useState([])

  // Mock data for rental items
  const mockItems = [
    {
      id: "1",
      title: "Professional DSLR Camera",
      description: "High-quality camera for professional photography",
      category: "Electronics",
      pricePerDay: 50,
      images: ["https://futureforward.in/images/thumbs/008/0080012_nikon-d5300-dslr-camera-18-140mm-vr-kit-black_600.jpeg"],
      available: true,
      location: "New York, NY",
      rating: 4.5,
    },
    {
      id: "2",
      title: "Mountain Bike",
      description: "Perfect for weekend adventures",
      category: "Vehicles",
      pricePerDay: 25,
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj9S7ihV9VVRE-Toi4SlJirKOxGFlUmSBLqA&s"],
      available: true,
      location: "Denver, CO",
      rating: 4.2,
    },
    {
      id: "3",
      title: "Camping Tent (4-Person)",
      description: "Waterproof tent for your outdoor adventures",
      category: "Others",
      pricePerDay: 15,
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPs_gZO_Z5F0pnF4ymr_kqJ_0d1sqv_vrL-Q&s"],
      available: true,
      location: "Portland, OR",
      rating: 3.8,
    },
    {
      id: "4",
      title: "Ergonomic Office Chair",
      description: "Comfortable chair for your home office",
      category: "Furniture",
      pricePerDay: 10,
      images: ["https://via.placeholder.com/300x200"],
      available: true,
      location: "Austin, TX",
      rating: 4.0,
    },
    {
      id: "5",
      title: "Wireless Bluetooth Speaker",
      description: "High-quality sound for your parties",
      category: "Electronics",
      pricePerDay: 8,
      images: ["https://via.placeholder.com/300x200"],
      available: true,
      location: "Miami, FL",
      rating: 4.7,
    },
    {
      id: "6",
      title: "Formal Suit",
      description: "Perfect for interviews and special occasions",
      category: "Clothing",
      pricePerDay: 20,
      images: ["https://via.placeholder.com/300x200"],
      available: true,
      location: "Chicago, IL",
      rating: 3.9,
    },
  ]

  useEffect(() => {
    // In a real app, you would fetch items from an API
    setItems(mockItems)
  }, [])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      })
    }
  }

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)

    if (files.length > 0) {
      files.forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImages((prevImages) => [
            ...prevImages,
            {
              name: file.name,
              preview: reader.result, // This is the base64 string
            },
          ])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  // Remove image
  const removeImage = (index) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  // Validate form
  const validateForm = () => {
    const errors = {}

    if (!formData.title.trim()) {
      errors.title = "Title is required"
    }

    if (!formData.category) {
      errors.category = "Category is required"
    }

    if (!formData.pricePerDay) {
      errors.pricePerDay = "Price is required"
    } else if (Number.parseFloat(formData.pricePerDay) < 0) {
      errors.pricePerDay = "Price cannot be negative"
    }

    setFormErrors(errors)

    // Return true if no errors
    return Object.keys(errors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmissionError("")

    if (validateForm()) {
      // In a real app, you would send this to your backend
      const newItem = {
        ...formData,
        id: Date.now().toString(), // Generate a temporary ID
        images: images.map((img) => img.preview),
        pricePerDay: Number.parseFloat(formData.pricePerDay),
        rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3 and 5
      }

      setItems([newItem, ...items])

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        pricePerDay: "",
        location: "",
        available: true,
      })
      setImages([])

      // Close modal
      setIsModalOpen(false)
    } else {
      setSubmissionError("Please fill all required fields")
    }
  }

  // Render star rating
  const renderRating = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
            <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              fill="url(#half-star)"
            />
            <defs>
              <linearGradient id="half-star" x1="0" x2="100%" y1="0" y2="0">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Available Items for Rent</h1>
        <button
          className="bg-black hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Add Your Item
        </button>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48 w-full">
              <img
                src={item.images[0] || "https://via.placeholder.com/300x200"}
                alt={item.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 pb-0">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">{item.category}</span>
              </div>
              {/* Rating */}
              <div className="mt-1">{renderRating(item.rating)}</div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
              <div className="flex items-center mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-sm">{item.location}</span>
              </div>
            </div>
            <div className="p-4 pt-0 flex justify-between items-center">
              <p className="font-bold">${item.pricePerDay}/day</p>
             <Link to="/rent" state={{ itemData: item }}>
             <button className="text-sm px-4 py-2 bg-black text-white rounded-md hover:bg-purple-700">
                Rent Now
              </button></Link>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Add a New Item for Rent</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form Submission Error */}
              {submissionError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p>{submissionError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md ${
                      formErrors.title ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter item title"
                  />
                  {formErrors.title && <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none h-24"
                    placeholder="Describe your item (max 1000 characters)"
                    maxLength={1000}
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.description.length}/1000 characters</p>
                </div>

                {/* Category and Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md ${
                        formErrors.category ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select a category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Books">Books</option>
                      <option value="Vehicles">Vehicles</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Others">Others</option>
                    </select>
                    {formErrors.category && <p className="mt-1 text-sm text-red-600">{formErrors.category}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Day ($)</label>
                    <input
                      type="number"
                      name="pricePerDay"
                      value={formData.pricePerDay}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className={`w-full px-3 py-2 border rounded-md ${
                        formErrors.pricePerDay ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {formErrors.pricePerDay && <p className="mt-1 text-sm text-red-600">{formErrors.pricePerDay}</p>}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="City, State"
                  />
                </div>

                {/* Available */}
                <div className="flex items-start space-x-3 p-4 border border-gray-300 rounded-md">
                  <input
                    type="checkbox"
                    id="available"
                    name="available"
                    checked={formData.available}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  <div>
                    <label htmlFor="available" className="block text-sm font-medium text-gray-700">
                      Available for rent
                    </label>
                    <p className="text-sm text-gray-500">Uncheck this if the item is not immediately available</p>
                  </div>
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      id="image-upload"
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="mt-2 text-sm text-gray-500">Click to upload images</p>
                      <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                    </label>
                  </div>

                  {/* Image Previews */}
                  {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      {images.map((img, index) => (
                        <div key={index} className="relative">
                          <img
                            src={img.preview || "/placeholder.svg"}
                            alt={`Preview ${index}`}
                            className="h-24 w-full object-cover rounded-md "
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Form Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-black text-white rounded-md hover:bg-purple-700">
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
