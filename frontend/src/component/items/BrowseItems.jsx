// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// export default function BrowseItems() {
// //   const [items, setItems] = useState([]);
//   const [filters, setFilters] = useState({
//     category: "",
//     location: "",
//     rating: "",
//     minPrice: "",
//     maxPrice: "",
//     keyword: "",
//     sortBy: "",
//     startDate: null,
//     endDate: null,
//   });

// //   const fetchItems = async () => {
// //     try {
// //       const queryParams = new URLSearchParams();

// //       Object.entries(filters).forEach(([key, value]) => {
// //         if (value) {
// //           if (value instanceof Date) {
// //             queryParams.append(key, value.toISOString());
// //           } else {
// //             queryParams.append(key, value);
// //           }
// //         }
// //       });

// //       const { data } = await axios.get(`/api/items/search?${queryParams.toString()}`);
// //       setItems(data);
// //     } catch (err) {
// //       console.error("Error fetching items:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchItems();
// //   }, []);

// //   const handleFilterChange = (e) => {
// //     setFilters({ ...filters, [e.target.name]: e.target.value });
// //   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold mb-6">Browse Rental Items</h2>

//       {/* Filters */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         <input
//           type="text"
//           name="keyword"
//           placeholder="Search..."
//           className="border px-4 py-2 rounded"
//           value={filters.keyword}
//         //   onChange={handleFilterChange}
//         />
//         <input
//           type="text"
//           name="category"
//           placeholder="Category"
//           className="border px-4 py-2 rounded"
//           value={filters.category}
//         //   onChange={handleFilterChange}
//         />
//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           className="border px-4 py-2 rounded"
//           value={filters.location}
//         //   onChange={handleFilterChange}
//         />
//         <input
//           type="number"
//           name="minPrice"
//           placeholder="Min Price"
//           className="border px-4 py-2 rounded"
//           value={filters.minPrice}
//         //   onChange={handleFilterChange}
//         />
//         <input
//           type="number"
//           name="maxPrice"
//           placeholder="Max Price"
//           className="border px-4 py-2 rounded"
//           value={filters.maxPrice}
//         //   onChange={handleFilterChange}
//         />
//         <input
//           type="number"
//           name="rating"
//           placeholder="Min Rating"
//           className="border px-4 py-2 rounded"
//           value={filters.rating}
//         //   onChange={handleFilterChange}
//         />

//         <DatePicker
//           selected={filters.startDate}
//           onChange={(date) => setFilters((prev) => ({ ...prev, startDate: date }))}
//           placeholderText="Start Date"
//           className="border px-4 py-2 rounded"
//           minDate={new Date()}
//         />
//         <DatePicker
//           selected={filters.endDate}
//           onChange={(date) => setFilters((prev) => ({ ...prev, endDate: date }))}
//           placeholderText="End Date"
//           className="border px-4 py-2 rounded"
//           minDate={filters.startDate || new Date()}
//         />

//         <select
//           name="sortBy"
//           className="border px-4 py-2 rounded"
//           value={filters.sortBy}
//         //   onChange={handleFilterChange}
//         >
//           <option value="">Sort By</option>
//           <option value="price-asc">Price (Low to High)</option>
//           <option value="price-desc">Price (High to Low)</option>
//           <option value="rating">Rating</option>
//         </select>

//         <button
//         //   onClick={fetchItems}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Apply Filters
//         </button>
//       </div>

//       {/* Results */}
//       {items.length ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {items.map((item) => (
//             <div key={item._id} className="border p-4 rounded shadow hover:shadow-md transition">
//               <img src={item.images?.[0]} alt={item.title} className="w-full h-40 object-cover rounded mb-4" />
//               <h3 className="text-lg font-semibold">{item.title}</h3>
//               <p className="text-gray-600">{item.description?.slice(0, 80)}...</p>
//               <p className="text-green-600 mt-2 font-bold">₹{item.pricePerDay} / day</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500 text-center mt-10">No items match your filters.</p>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react"
import { Search, MapPin, Tag, Star, Calendar, ArrowUpDown, Filter, X } from "lucide-react"
import {useNavigate} from 'react-router-dom'
import { useItem } from "../../providers/Items/ItemProvider"

export default function BrowseItems() {
  // const [items, setItems] = useState([])
  const {items} = useItem();
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    rating: 0,
    minPrice: 0,
    maxPrice: 5000,
    keyword: "",
    sortBy: "",
    startDate: null,
    endDate: null,
  })
  const [showFilters, setShowFilters] = useState(false)
  const [activeSort, setActiveSort] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const navigate = useNavigate();

  const categories = ["Electronics", "Furniture", "Clothing", "Sports", "Tools", "Vehicles"]

  // Mock data for preview
  // useEffect(() => {
  //   const mockItems = [
  //     {
  //       _id: "1",
  //       title: "Professional DSLR Camera",
  //       description: "High-quality camera perfect for photography enthusiasts and professionals.",
  //       pricePerDay: 1200,
  //       category: "Electronics",
  //       rating: 4.8,
  //       location: "Mumbai",
  //       images: ["/placeholder.svg?height=300&width=400"],
  //     },
  //     {
  //       _id: "2",
  //       title: "Mountain Bike",
  //       description: "Durable mountain bike suitable for rough terrains and long rides.",
  //       pricePerDay: 350,
  //       category: "Sports",
  //       rating: 4.5,
  //       location: "Delhi",
  //       images: ["/placeholder.svg?height=300&width=400"],
  //     },
  //     {
  //       _id: "3",
  //       title: "Camping Tent (4-Person)",
  //       description: "Spacious tent with weather protection for your outdoor adventures.",
  //       pricePerDay: 250,
  //       category: "Sports",
  //       rating: 4.2,
  //       location: "Bangalore",
  //       images: ["/placeholder.svg?height=300&width=400"],
  //     },
  //     {
  //       _id: "4",
  //       title: "Wireless Speaker System",
  //       description: "Premium sound quality for parties and gatherings with Bluetooth connectivity.",
  //       pricePerDay: 180,
  //       category: "Electronics",
  //       rating: 4.7,
  //       location: "Chennai",
  //       images: ["/placeholder.svg?height=300&width=400"],
  //     },
  //     {
  //       _id: "5",
  //       title: "Electric Drill Set",
  //       description: "Complete set with various drill bits for all your DIY projects.",
  //       pricePerDay: 220,
  //       category: "Tools",
  //       rating: 4.4,
  //       location: "Hyderabad",
  //       images: ["/placeholder.svg?height=300&width=400"],
  //     },
  //     {
  //       _id: "6",
  //       title: "Luxury Sofa Set",
  //       description: "Elegant and comfortable sofa perfect for events and temporary home setups.",
  //       pricePerDay: 800,
  //       category: "Furniture",
  //       rating: 4.9,
  //       location: "Pune",
  //       images: ["/placeholder.svg?height=300&width=400"],
  //     },
  //   ]

  //   setItems(mockItems)
  // }, [])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  const handleSliderChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: Number.parseInt(value) })
  }

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const handleSortChange = (sortOption) => {
    setActiveSort(sortOption)
    setFilters({ ...filters, sortBy: sortOption })
  }

  const clearFilters = () => {
    setFilters({
      category: "",
      location: "",
      rating: 0,
      minPrice: 0,
      maxPrice: 5000,
      keyword: "",
      sortBy: "",
      startDate: null,
      endDate: null,
    })
    setSelectedCategories([])
    setActiveSort("")
  }

  const formatDate = (date) => {
    if (!date) return ""
    return new Date(date).toLocaleDateString()
  }

  // Custom date picker component
  const CustomDatePicker = ({ label, value, onChange }) => {
    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative">
          <input
            type="date"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 pl-9 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
          <Calendar className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
    )
  }

  // Custom slider component
  const CustomSlider = ({ min, max, value, onChange, label, name }) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}: ₹{value}
        </label>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          name={name}
          onChange={onChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹{min}</span>
          <span>₹{max}</span>
        </div>
      </div>
    )
  }

  // Custom rating component
  const RatingStars = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    )
  }

  return (
    <div className="max-w-8xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Browse Rental Items</h2>

          <div className="flex mt-4 md:mt-0 space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              <Filter size={18} className="mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>

            <button
              onClick={clearFilters}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
            >
              <X size={18} className="mr-2" />
              Clear
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <input
            type="text"
            name="keyword"
            placeholder="Search for items..."
            className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={filters.keyword}
            onChange={handleFilterChange}
          />
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 animate-fadeIn">
            {/* Location filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  placeholder="Any location"
                  className="w-full p-2 pl-9 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={filters.location}
                  onChange={handleFilterChange}
                />
                <MapPin className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Category filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-3 py-1.5 text-sm rounded-full flex items-center ${
                      selectedCategories.includes(category)
                        ? "bg-blue-100 text-blue-800 border-blue-300"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    } border transition-all`}
                  >
                    <Tag size={14} className="mr-1" />
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price range sliders */}
            <div className="md:col-span-2 lg:col-span-1">
              <div className="space-y-4">
                <CustomSlider
                  min={0}
                  max={5000}
                  value={filters.minPrice}
                  onChange={handleSliderChange}
                  label="Min Price"
                  name="minPrice"
                />
                <CustomSlider
                  min={0}
                  max={10000}
                  value={filters.maxPrice}
                  onChange={handleSliderChange}
                  label="Max Price"
                  name="maxPrice"
                />
              </div>
            </div>

            {/* Date pickers */}
            <div>
              <CustomDatePicker
                label="Start Date"
                value={filters.startDate}
                onChange={(date) => setFilters((prev) => ({ ...prev, startDate: date }))}
              />
            </div>
            <div>
              <CustomDatePicker
                label="End Date"
                value={filters.endDate}
                onChange={(date) => setFilters((prev) => ({ ...prev, endDate: date }))}
              />
            </div>

            {/* Rating filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFilters({ ...filters, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      size={24}
                      className={`${
                        star <= filters.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      } cursor-pointer hover:text-yellow-400 transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sort options */}
        <div className="flex items-center justify-end mb-4">
          <div className="text-sm text-gray-600 mr-2 flex items-center">
            <ArrowUpDown size={16} className="mr-1" /> Sort by:
          </div>
          <div className="flex space-x-2">
            {[
              { id: "price-asc", label: "Price: Low to High" },
              { id: "price-desc", label: "Price: High to Low" },
              { id: "rating", label: "Rating" },
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => handleSortChange(option.id)}
                className={`px-3 py-1 text-sm rounded-lg transition-all ${
                  activeSort === option.id ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {items.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" >
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => navigate(`/item/${item._id}`)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_FILE_URL}${item.images[0]}` || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-lg shadow text-sm font-semibold text-blue-600">
                  ₹{item.pricePerDay}/day
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{item.title}</h3>
                  <RatingStars rating={item.rating} />
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <MapPin size={14} className="mr-1" />
                  {item.location}
                  <span className="mx-2">•</span>
                  <Tag size={14} className="mr-1" />
                  {item.category}
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <p className="text-gray-500 text-xl">No items match your filters.</p>
          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}
