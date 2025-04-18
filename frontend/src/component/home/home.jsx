"use client"

import { useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
  faCalendarDays,
  faSearch,
  faTags,
  faDollarSign,
  faShield,
  faHandshake,
  faUsers,
} from "@fortawesome/free-solid-svg-icons"
import Bannar from "../../assets/bannar/bannar.png"
import { useNavigate } from "react-router-dom"

export const Home = () => {
  const scrollRef = useRef(null)
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [category, setCategory] = useState("")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const navigate = useNavigate();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const cities = [
    { city: "rewari", img: "https://www.holidify.com/images/bgImages/BANGALORE.jpg" },
    {
      city: "rohtak",
      img: "https://images.unsplash.com/photo-1617516202907-ff75846e6667?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGF3YSUyMG1haGFsJTIwamFpcHVyJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D",
    },
    {
      city: "Kolkata",
      img: "https://media.istockphoto.com/id/1005830448/photo/howrah-bridge.jpg?s=612x612&w=0&k=20&c=g5Zbl2IKWsKdkrxxfDs4zSYQjStH0xvNuq0pc6WH_vk=",
    },
    {
      city: "Chennai",
      img: "https://www.shutterstock.com/image-photo/beautiful-view-valluvar-kottamauditorium-monument-600nw-1763868740.jpg",
    },
    {
      city: "Mumbai",
      img: "https://static.toiimg.com/thumb/msid-88428704,imgsize-139696,width-900,height-1200,resizemode-6/88428704.jpg",
    },
    {
      city: "Delhi",
      img: "https://media2.thrillophilia.com/images/photos/000/044/480/original/1524478881_shutterstock_418380280.jpg?w=753&h=450&dpr=1.5",
    },
    {
      city: "Chandigarh",
      img: "https://thumbs.dreamstime.com/b/elante-mall-chandigarh-elante-mall-chandigarh-enjoy-life-like-159023609.jpg",
    },
  ]

  const categories = ["Electronics", "Furniture", "Vehicles", "Tools", "Clothing", "Sports", "Party Supplies"]

  return (
    <div className="w-full font-sans bg-gradient-to-b from-white to-gray-50">

      <section className="relative bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 sm:px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Rent Anything You Need, Anytime, Anywhere
              </h1>
              <p className="mt-6 text-gray-600 text-lg max-w-xl">
                Discover a world of convenience with our Rent Anything platform. From tools to vacation gear, we connect
                you with what you need, when you need it.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-all transform hover:scale-105">
                  Get Started
                </button>
                <button className="border-2 border-black px-8 py-3 rounded-full font-medium hover:bg-black hover:text-white transition-all">
                  Learn More
                </button>
              </div>
            </div>

            {/* Search Box */}
            <div className="md:w-5/12 mt-12 md:mt-0 bg-white p-6 rounded-2xl shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-center">Find What You Need</h2>

              {/* Date Range */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                  <FontAwesomeIcon icon={faCalendarDays} className="mr-2 text-gray-500" />
                  Date Range
                </label>
                <div className="flex space-x-2">
                  <input
                    type="date"
                    className="w-1/2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    min={new Date().toISOString().split("T")[0]}
                    max={dateRange.end || new Date(new Date().setMonth(new Date().getMonth() + 4)).toISOString().split("T")[0]}
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  />
                  <input
                    type="date"
                    className="w-1/2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    min={dateRange.start || new Date().toISOString().split("T")[0]}
                    max={new Date(new Date().setMonth(new Date().getMonth() + 4)).toISOString().split("T")[0]}
                  />
                </div>
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                  <FontAwesomeIcon icon={faTags} className="mr-2 text-gray-500" />
                  Category
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                  <FontAwesomeIcon icon={faDollarSign} className="mr-2 text-gray-500" />
                  Price Range (₹{priceRange.min} - ₹{priceRange.max})
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="50"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹0</span>
                  <span>₹10000+</span>
                </div>
              </div>

              {/* Search Button */}
              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center" onClick={() =>navigate(`/search?category=${category}&minPrice=${priceRange.min}&maxPrice=${priceRange.max}&startDate=${dateRange.start}&endDate=${dateRange.end}`)}>
                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                Search Available Rentals
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Banner with Overlay Text */}
      {/* <div className="relative mx-4 sm:mx-6 md:mx-16 my-12">
        <div className="h-[60vh] md:h-[70vh] overflow-hidden rounded-2xl">
          <img src={Bannar || "/placeholder.svg"} className="w-full h-full object-cover" alt="Banner" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">Unlock the Power of Sharing Economy</h2>
            <p className="text-lg md:text-xl max-w-2xl text-center">
              Why buy when you can rent? Save money and reduce waste while accessing exactly what you need.
            </p>
            <button className="mt-8 bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all">
              Explore Popular Rentals
            </button>
          </div>
        </div>
      </div> */}

      {/* Features Section with Icons */}
      {/* <section className="text-center px-4 sm:px-6 md:px-16 py-16 bg-white">
        <h2 className="text-3xl font-bold mb-2">Why Choose Our Platform?</h2>
        <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
          Discover an extensive selection of rental products for every need with our user-friendly platform
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-8 bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faHandshake} className="text-indigo-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Hassle-Free Renting</h3>
            <p className="text-gray-600">
              Browse, select, and enjoy renting in just a few clicks. Our streamlined process makes renting simple.
            </p>
          </div>
          <div className="p-8 bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faShield} className="text-indigo-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
            <p className="text-gray-600">
              Your security is our priority. Enjoy peace of mind with our secure payment system and verification
              process.
            </p>
          </div>
          <div className="p-8 bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faUsers} className="text-indigo-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Join Our Community</h3>
            <p className="text-gray-600">
              Connect with happy renters and providers. Share experiences and build relationships in our growing
              community.
            </p>
          </div>
        </div>
      </section> */}

      {/* Popular Categories Section */}
      <section className="px-4 sm:px-6 md:px-16 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all text-center cursor-pointer"
                onClick={() => navigate(`/search?category=${cat}`)}
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FontAwesomeIcon icon={faTags} className="text-indigo-600" />
                </div>
                <p className="font-medium">{cat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities Section with Improved Carousel */}
      <section className="text-center px-4 sm:px-6 md:px-16 py-16">
        <h2 className="text-3xl font-bold mb-2">Explore Cities Across India</h2>
        <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
          Find rentals in major cities throughout India. Our platform connects you with local providers wherever you go.
        </p>

        <div className="relative max-w-6xl mx-auto">
          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-4 rounded-full shadow-lg z-10 hover:bg-gray-100 transition-all"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="lg" className="text-gray-700" />
          </button>

          {/* Scrollable Carousel */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto space-x-6 py-8 px-4 scrollbar-hide scroll-smooth"
            style={{ scrollBehavior: "smooth", overflowX: "hidden" }}
          >
            {cities.map((place, index) => (
              <div
                key={index}
                className="w-72 h-96 flex-shrink-0 rounded-xl shadow-lg overflow-hidden group relative cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
                <img
                  src={place.img || "/placeholder.svg"}
                  alt={place.city}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                  <h3 className="text-2xl font-bold">{place.city}</h3>
                  <p className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore rentals in {place.city}
                  </p>
                  <button className="mt-3 bg-white cursor-pointer text-black px-4 py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0" onClick={() => navigate(`/search?location=${place.city}`)}>
                    View Listings
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-4 rounded-full shadow-lg z-10 hover:bg-gray-100 transition-all"
          >
            <FontAwesomeIcon icon={faChevronRight} size="lg" className="text-gray-700" />
          </button>
        </div>
      </section>

      {/* Call to Action */}
      {/* <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4 sm:px-6 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Renting?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of satisfied users who are already saving money and accessing exactly what they need through
            our platform.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all">
              Sign Up Now
            </button>
            <button className="border-2 border-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-indigo-600 transition-all">
              Browse Rentals
            </button>
          </div>
        </div>
      </section> */}
    </div>
  )
}


// import React, { useRef } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
// import Bannar from "../../assets/bannar/bannar.png"
// import Bannar2 from "../../assets/bannar/bannar2.png"

// export const Home = () => {
//   const scrollRef = useRef(null);

//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       const scrollAmount = 300; // Adjust based on image width
//       scrollRef.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   const cities = [
//     { city: "Bangalore", img: "https://www.holidify.com/images/bgImages/BANGALORE.jpg" },
//     { city: "Jaipur", img: "https://images.unsplash.com/photo-1617516202907-ff75846e6667?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGF3YSUyMG1haGFsJTIwamFpcHVyJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D" },
//     { city: "Kolkata", img: "https://media.istockphoto.com/id/1005830448/photo/howrah-bridge.jpg?s=612x612&w=0&k=20&c=g5Zbl2IKWsKdkrxxfDs4zSYQjStH0xvNuq0pc6WH_vk=" },
//     { city: "Chennai", img: "https://www.shutterstock.com/image-photo/beautiful-view-valluvar-kottamauditorium-monument-600nw-1763868740.jpg" },
//     { city: "Mumbai", img: "https://static.toiimg.com/thumb/msid-88428704,imgsize-139696,width-900,height-1200,resizemode-6/88428704.jpg" },
//     { city: "Delhi", img: "https://media2.thrillophilia.com/images/photos/000/044/480/original/1524478881_shutterstock_418380280.jpg?w=753&h=450&dpr=1.5" },
//     { city: "Chandigarh", img: "https://thumbs.dreamstime.com/b/elante-mall-chandigarh-elante-mall-chandigarh-enjoy-life-like-159023609.jpg" }
//   ];

// return (
//   <div className="w-full font-sans">
//     {/* Hero Section */}
//     <section className="px-4 sm:px-6 md:px-16 py-12 md:py-20 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
//       <div className="md:w-1/2">
//         <h1 className="text-3xl md:text-5xl font-bold leading-tight">
//           Rent Anything You Need, Anytime, Anywhere
//         </h1>
//       </div>
//       <div className="md:w-1/2 mt-6 md:mt-0">
//         <p className="text-gray-600">
//           Discover a world of convenience with our Rent Anything platform.
//           From tools to vacation gear, we connect you with what you need,
//           when you need it.
//         </p>
//         <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
//           <button className="bg-black text-white px-6 py-2 rounded">Get Started</button>
//           <button className="border border-black px-6 py-2 rounded">Learn More</button>
//         </div>
//       </div>
//     </section>

//     {/* Banner */}
//     <div className="mx-4 sm:mx-6 md:mx-10 h-[50vh] md:h-screen bg-gray-300 flex items-center justify-center relative">
//       <img 
//         src={Bannar} 
//         className="w-full h-full object-cover rounded-lg"
//         alt="Banner"
//       />
//     </div>

//     {/* Features Section */}
//     <section className="text-center px-4 sm:px-6 py-12">
//       <h2 className="text-2xl font-semibold">
//         Discover an Extensive Selection of Rental Products for Every Need
//       </h2>
//       <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         <div className="p-6 bg-white shadow-md rounded">
//           <h3 className="font-semibold">Hassle-Free Renting</h3>
//           <p className="text-gray-600 mt-2">Browse, select, and enjoy renting in no time.</p>
//         </div>
//         <div className="p-6 bg-white shadow-md rounded">
//           <h3 className="font-semibold">Secure Payments</h3>
//           <p className="text-gray-600 mt-2">Your security is our priority.</p>
//         </div>
//         <div className="p-6 bg-white shadow-md rounded">
//           <h3 className="font-semibold">Join Our Community</h3>
//           <p className="text-gray-600 mt-2">Connect with happy renters and providers.</p>
//         </div>
//       </div>
//     </section>

//     {/* Cities Section */}
//     <section className="text-center px-6 py-12 relative">
//       <h2 className="text-2xl font-semibold">Zoom around all over India</h2>
//       <div className="flex justify-center items-center mt-6 relative w-1/2 mx-auto">
//          {/* Left Button */}
//          <button
//            onClick={() => scroll("left")}
//           className="absolute left-0 bg-gray-200 p-3 rounded-full shadow-md z-10"
//         >
//            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
//         </button>

//          {/* Scrollable Carousel */}
//          <div
//            ref={scrollRef}
//           className="flex overflow-x-auto space-x-4 scrollbar-hide px-10 scroll-smooth"
//            style={{ scrollBehavior: "smooth", overflowX: "hidden" }}
//          >
//            {cities.map((place, index) => (
//              <div
//                key={index}
//                className="w-64 h-80 bg-gray-300 flex items-end p-4 rounded-lg shadow-md text-white"
//                style={{
//                  backgroundImage: `url(${place.img})`,
//                  backgroundSize: "cover",
//                  backgroundPosition: "center",
//                  flexShrink: 0,
//                }}
//              >
//                <h3 className="bg-opacity-50 px-3 py-1 rounded text-white text-lg mx-auto font-semibold">
//                  {place.city}
//                </h3>
//              </div>
//            ))}
//          </div>

//          {/* Right Button */}
//          <button
//            onClick={() => scroll("right")}
//            className="absolute right-0 bg-gray-200 p-3 rounded-full shadow-md z-10"
//         >
//            <FontAwesomeIcon icon={faChevronRight} size="lg" />
//         </button>
//       </div>
//     </section>
//   </div>
// );
// };
