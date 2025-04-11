
// useEffect(()=>{
// fetch("https://dummyjson.com/products")
// .then(data=>{
//     return data.json()
// })
// .then(data=>{
//     setProducts(data.products)
// })
// },[])




import React, { useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Bannar from "../../assets/bannar/bannar.png"
import Bannar2 from "../../assets/bannar/bannar2.png"

export const Home = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Adjust based on image width
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const cities = [
    { city: "Bangalore", img: "https://www.holidify.com/images/bgImages/BANGALORE.jpg" },
    { city: "Jaipur", img: "https://images.unsplash.com/photo-1617516202907-ff75846e6667?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGF3YSUyMG1haGFsJTIwamFpcHVyJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D" },
    { city: "Kolkata", img: "https://media.istockphoto.com/id/1005830448/photo/howrah-bridge.jpg?s=612x612&w=0&k=20&c=g5Zbl2IKWsKdkrxxfDs4zSYQjStH0xvNuq0pc6WH_vk=" },
    { city: "Chennai", img: "https://www.shutterstock.com/image-photo/beautiful-view-valluvar-kottamauditorium-monument-600nw-1763868740.jpg" },
    { city: "Mumbai", img: "https://static.toiimg.com/thumb/msid-88428704,imgsize-139696,width-900,height-1200,resizemode-6/88428704.jpg" },
    { city: "Delhi", img: "https://media2.thrillophilia.com/images/photos/000/044/480/original/1524478881_shutterstock_418380280.jpg?w=753&h=450&dpr=1.5" },
    { city: "Chandigarh", img: "https://thumbs.dreamstime.com/b/elante-mall-chandigarh-elante-mall-chandigarh-enjoy-life-like-159023609.jpg" }
  ];

return (
  <div className="w-full font-sans">
    {/* Hero Section */}
    <section className="px-4 sm:px-6 md:px-16 py-12 md:py-20 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
      <div className="md:w-1/2">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Rent Anything You Need, Anytime, Anywhere
        </h1>
      </div>
      <div className="md:w-1/2 mt-6 md:mt-0">
        <p className="text-gray-600">
          Discover a world of convenience with our Rent Anything platform.
          From tools to vacation gear, we connect you with what you need,
          when you need it.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-black text-white px-6 py-2 rounded">Get Started</button>
          <button className="border border-black px-6 py-2 rounded">Learn More</button>
        </div>
      </div>
    </section>

    {/* Banner */}
    <div className="mx-4 sm:mx-6 md:mx-10 h-[50vh] md:h-screen bg-gray-300 flex items-center justify-center relative">
      <img 
        src={Bannar} 
        className="w-full h-full object-cover rounded-lg"
        alt="Banner"
      />
    </div>

    {/* Features Section */}
    <section className="text-center px-4 sm:px-6 py-12">
      <h2 className="text-2xl font-semibold">
        Discover an Extensive Selection of Rental Products for Every Need
      </h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow-md rounded">
          <h3 className="font-semibold">Hassle-Free Renting</h3>
          <p className="text-gray-600 mt-2">Browse, select, and enjoy renting in no time.</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded">
          <h3 className="font-semibold">Secure Payments</h3>
          <p className="text-gray-600 mt-2">Your security is our priority.</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded">
          <h3 className="font-semibold">Join Our Community</h3>
          <p className="text-gray-600 mt-2">Connect with happy renters and providers.</p>
        </div>
      </div>
    </section>

    {/* Cities Section */}
    <section className="text-center px-6 py-12 relative">
      <h2 className="text-2xl font-semibold">Zoom around all over India</h2>
      <div className="flex justify-center items-center mt-6 relative w-1/2 mx-auto">
         {/* Left Button */}
         <button
           onClick={() => scroll("left")}
          className="absolute left-0 bg-gray-200 p-3 rounded-full shadow-md z-10"
        >
           <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>

         {/* Scrollable Carousel */}
         <div
           ref={scrollRef}
          className="flex overflow-x-auto space-x-4 scrollbar-hide px-10 scroll-smooth"
           style={{ scrollBehavior: "smooth", overflowX: "hidden" }}
         >
           {cities.map((place, index) => (
             <div
               key={index}
               className="w-64 h-80 bg-gray-300 flex items-end p-4 rounded-lg shadow-md text-white"
               style={{
                 backgroundImage: `url(${place.img})`,
                 backgroundSize: "cover",
                 backgroundPosition: "center",
                 flexShrink: 0,
               }}
             >
               <h3 className="bg-opacity-50 px-3 py-1 rounded text-white text-lg mx-auto font-semibold">
                 {place.city}
               </h3>
             </div>
           ))}
         </div>

         {/* Right Button */}
         <button
           onClick={() => scroll("right")}
           className="absolute right-0 bg-gray-200 p-3 rounded-full shadow-md z-10"
        >
           <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </button>
      </div>
    </section>
  </div>
);
};


// export const Home = () => {
//     const scrollRef = useRef(null);

//     const scroll = (direction) => {
//       if (scrollRef.current) {
//         const scrollAmount = 300; // Adjust based on image width
//         scrollRef.current.scrollBy({
//           left: direction === "left" ? -scrollAmount : scrollAmount,
//           behavior: "smooth",
//         });
//       }
//     };
  
//     const cities = [
//       { city: "Bangalore", img: "https://www.holidify.com/images/bgImages/BANGALORE.jpg" },
//       { city: "Jaipur", img: "https://images.unsplash.com/photo-1617516202907-ff75846e6667?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGF3YSUyMG1haGFsJTIwamFpcHVyJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D" },
//       { city: "Kolkata", img: "https://media.istockphoto.com/id/1005830448/photo/howrah-bridge.jpg?s=612x612&w=0&k=20&c=g5Zbl2IKWsKdkrxxfDs4zSYQjStH0xvNuq0pc6WH_vk=" },
//       { city: "Chennai", img: "https://www.shutterstock.com/image-photo/beautiful-view-valluvar-kottamauditorium-monument-600nw-1763868740.jpg" },
//       { city: "Mumbai", img: "https://static.toiimg.com/thumb/msid-88428704,imgsize-139696,width-900,height-1200,resizemode-6/88428704.jpg" },
//       { city: "Delhi", img: "https://media2.thrillophilia.com/images/photos/000/044/480/original/1524478881_shutterstock_418380280.jpg?w=753&h=450&dpr=1.5" },
//       { city: "Chandigarh", img: "https://thumbs.dreamstime.com/b/elante-mall-chandigarh-elante-mall-chandigarh-enjoy-life-like-159023609.jpg" }
//     ];

//   return (
//     <div className="w-full font-sans">
//       {/* Hero Section */}
//       <section className="px-6 py-12 md:px-16 md:py-20 lg:px-24 flex flex-col md:flex-row justify-between items-center">
//         <div className="md:w-1/2">
//           <h1 className="text-3xl md:text-5xl font-bold leading-tight">
//             Rent Anything You Need, Anytime, Anywhere
//           </h1>
//         </div>
//         <div className="md:w-1/2">
//           <p className="mt-4 text-gray-600">
//             Discover a world of convenience with our Rent Anything platform.
//             From tools to vacation gear, we connect you with what you need,
//             when you need it.
//           </p>
//           <div className="mt-6 flex space-x-4">
//             <button className="bg-black text-white px-6 py-2 rounded">Get Started</button>
//             <button className="border border-black px-6 py-2 rounded">Learn More</button>
//           </div>
//         </div>
//       </section>

//       {/* Banner */}
//       <div className="mx-4 sm:mx-6 md:mx-10 h-screen bg-gray-300 flex items-center justify-center relative">
//   <img 
//     src={Bannar} 
//     className="w-full h-full object-cover rounded-lg max-h-[90vh] sm:max-h-full"
//     alt="Banner"
//   />
// </div>


//       {/* Features Section */}
//       <section className="text-center px-6 py-12">
//         <h2 className="text-2xl font-semibold">
//           Discover an Extensive Selection of Rental Products for Every Need
//         </h2>
//         <div className="mt-8 grid md:grid-cols-3 gap-6">
//           <div className="p-6 bg-white shadow-md rounded">
//             <h3 className="font-semibold">Hassle-Free Renting</h3>
//             <p className="text-gray-600 mt-2">Browse, select, and enjoy renting in no time.</p>
//           </div>
//           <div className="p-6 bg-white shadow-md rounded">
//             <h3 className="font-semibold">Secure Payments</h3>
//             <p className="text-gray-600 mt-2">Your security is our priority.</p>
//           </div>
//           <div className="p-6 bg-white shadow-md rounded">
//             <h3 className="font-semibold">Join Our Community</h3>
//             <p className="text-gray-600 mt-2">Connect with happy renters and providers.</p>
//           </div>
//         </div>
//       </section>

//       {/* Cities Section */}
//       <section className="text-center px-6 py-12 relative">
//       <h2 className="text-2xl font-semibold">Zoom around all over India</h2>
//       <div className="flex justify-center items-center mt-6 relative w-1/2 mx-auto">
//         {/* Left Button */}
//         <button
//           onClick={() => scroll("left")}
//           className="absolute left-0 bg-gray-200 p-3 rounded-full shadow-md z-10"
//         >
//           <FontAwesomeIcon icon={faChevronLeft} size="lg" />
//         </button>

//         {/* Scrollable Carousel */}
//         <div
//           ref={scrollRef}
//           className="flex overflow-x-auto space-x-4 scrollbar-hide px-10 scroll-smooth"
//           style={{ scrollBehavior: "smooth", overflowX: "hidden" }}
//         >
//           {cities.map((place, index) => (
//             <div
//               key={index}
//               className="w-64 h-80 bg-gray-300 flex items-end p-4 rounded-lg shadow-md text-white"
//               style={{
//                 backgroundImage: `url(${place.img})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 flexShrink: 0,
//               }}
//             >
//               <h3 className="bg-opacity-50 px-3 py-1 rounded text-white text-lg mx-auto font-semibold">
//                 {place.city}
//               </h3>
//             </div>
//           ))}
//         </div>

//         {/* Right Button */}
//         <button
//           onClick={() => scroll("right")}
//           className="absolute right-0 bg-gray-200 p-3 rounded-full shadow-md z-10"
//         >
//           <FontAwesomeIcon icon={faChevronRight} size="lg" />
//         </button>
//       </div>
//     </section>
//     </div>
//   );
// };