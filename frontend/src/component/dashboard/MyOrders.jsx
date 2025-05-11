// import React, { useState } from "react";
// import { Search } from "lucide-react";

// const MyOrders = () => {
//   const [orders, setOrders] = useState([
//     {
//       id: "ORD123456",
//       itemName: "DSLR Camera",
//       owner: "John Doe",
//       startDate: "2023-04-15",
//       endDate: "2023-04-20",
//       totalAmount: 2500,
//       status: "completed",
//     },
//     {
//       id: "ORD789012",
//       itemName: "Mountain Bike",
//       owner: "Jane Smith",
//       startDate: "2023-05-10",
//       endDate: "2023-05-15",
//       totalAmount: 1800,
//       status: "active",
//     },
//     {
//       id: "ORD345678",
//       itemName: "Camping Tent",
//       owner: "Mike Johnson",
//       startDate: "2023-06-01",
//       endDate: "2023-06-05",
//       totalAmount: 1200,
//       status: "upcoming",
//     },
//   ]);

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "short", day: "numeric" };
//     return new Date(dateString).toLocaleDateString("en-US", options);
//   };
//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-6">
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search orders..."
//               className="pl-9 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Order ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Item
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Owner
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Rental Period
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {orders.map((order) => (
//                 <tr key={order.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {order.id}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">
//                       {order.itemName}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{order.owner}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">
//                       {formatDate(order.startDate)} -{" "}
//                       {formatDate(order.endDate)}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-indigo-600">
//                       {formatCurrency(order.totalAmount)}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         order.status === "active"
//                           ? "bg-green-100 text-green-800"
//                           : order.status === "completed"
//                           ? "bg-blue-100 text-blue-800"
//                           : "bg-yellow-100 text-yellow-800"
//                       }`}
//                     >
//                       {order.status.charAt(0).toUpperCase() +
//                         order.status.slice(1)}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <button className="text-indigo-600 hover:text-indigo-900 mr-3">
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyOrders;
// import React, { useState } from "react";
// import { Search } from "lucide-react";

// const MyOrders = () => {
//   const initialOrders = [
//     {
//       id: "ORD123456",
//       itemName: "DSLR Camera",
//       owner: "John Doe",
//       startDate: "2023-04-15",
//       endDate: "2023-04-20",
//       totalAmount: 2500,
//       status: "completed",
//     },
//     {
//       id: "ORD789012",
//       itemName: "Mountain Bike",
//       owner: "Jane Smith",
//       startDate: "2023-05-10",
//       endDate: "2023-05-15",
//       totalAmount: 1800,
//       status: "active",
//     },
//     {
//       id: "ORD345678",
//       itemName: "Camping Tent",
//       owner: "Mike Johnson",
//       startDate: "2023-06-01",
//       endDate: "2023-06-05",
//       totalAmount: 1200,
//       status: "upcoming",
//     },
//   ];

//   const [orders] = useState(initialOrders);
//   const [searchQuery, setSearchQuery] = useState("");

//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(amount);

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "short", day: "numeric" };
//     return new Date(dateString).toLocaleDateString("en-US", options);
//   };

//   // Filter orders based on search query
//   const filteredOrders = orders.filter((order) =>
//     order.itemName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-6">
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search orders..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-9 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Order ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Item
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Owner
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Rental Period
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredOrders.length > 0 ? (
//                 filteredOrders.map((order) => (
//                   <tr key={order.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {order.id}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">
//                         {order.itemName}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{order.owner}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         {formatDate(order.startDate)} -{" "}
//                         {formatDate(order.endDate)}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-indigo-600">
//                         {formatCurrency(order.totalAmount)}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           order.status === "active"
//                             ? "bg-green-100 text-green-800"
//                             : order.status === "completed"
//                             ? "bg-blue-100 text-blue-800"
//                             : "bg-yellow-100 text-yellow-800"
//                         }`}
//                       >
//                         {order.status.charAt(0).toUpperCase() +
//                           order.status.slice(1)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <button className="text-indigo-600 hover:text-indigo-900 mr-3">
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={7}
//                     className="text-center py-6 text-sm text-gray-500"
//                   >
//                     No orders found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyOrders;
// import React, { useState, useMemo } from "react";
// import { Search, ChevronLeft, ChevronRight } from "lucide-react";

// const MyOrders = () => {
//   const [orders] = useState([
//     {
//       id: "ORD123456",
//       itemName: "DSLR Camera",
//       owner: "John Doe",
//       startDate: "2023-04-15",
//       endDate: "2023-04-20",
//       totalAmount: 2500,
//       status: "completed",
//     },
//     {
//       id: "ORD789012",
//       itemName: "Mountain Bike",
//       owner: "Jane Smith",
//       startDate: "2023-05-10",
//       endDate: "2023-05-15",
//       totalAmount: 1800,
//       status: "active",
//     },
//     {
//       id: "ORD345678",
//       itemName: "Camping Tent",
//       owner: "Mike Johnson",
//       startDate: "2023-06-01",
//       endDate: "2023-06-05",
//       totalAmount: 1200,
//       status: "upcoming",
//     },
//     {
//       id: "ORD999999",
//       itemName: "GoPro",
//       owner: "Alice Brown",
//       startDate: "2023-07-01",
//       endDate: "2023-07-05",
//       totalAmount: 1600,
//       status: "active",
//     },
//     {
//       id: "ORD123456",
//       itemName: "DSLR Camera",
//       owner: "John Doe",
//       startDate: "2023-04-15",
//       endDate: "2023-04-20",
//       totalAmount: 2500,
//       status: "completed",
//     },
//     {
//       id: "ORD789012",
//       itemName: "Mountain Bike",
//       owner: "Jane Smith",
//       startDate: "2023-05-10",
//       endDate: "2023-05-15",
//       totalAmount: 1800,
//       status: "active",
//     },
//     {
//       id: "ORD345678",
//       itemName: "Camping Tent",
//       owner: "Mike Johnson",
//       startDate: "2023-06-01",
//       endDate: "2023-06-05",
//       totalAmount: 1200,
//       status: "upcoming",
//     },
//     {
//       id: "ORD999999",
//       itemName: "GoPro",
//       owner: "Alice Brown",
//       startDate: "2023-07-01",
//       endDate: "2023-07-05",
//       totalAmount: 1600,
//       status: "active",
//     },
//     {
//       id: "ORD123456",
//       itemName: "DSLR Camera",
//       owner: "John Doe",
//       startDate: "2023-04-15",
//       endDate: "2023-04-20",
//       totalAmount: 2500,
//       status: "completed",
//     },
//     {
//       id: "ORD789012",
//       itemName: "Mountain Bike",
//       owner: "Jane Smith",
//       startDate: "2023-05-10",
//       endDate: "2023-05-15",
//       totalAmount: 1800,
//       status: "active",
//     },
//     {
//       id: "ORD345678",
//       itemName: "Camping Tent",
//       owner: "Mike Johnson",
//       startDate: "2023-06-01",
//       endDate: "2023-06-05",
//       totalAmount: 1200,
//       status: "upcoming",
//     },
//     {
//       id: "ORD999999",
//       itemName: "GoPro",
//       owner: "Alice Brown",
//       startDate: "2023-07-01",
//       endDate: "2023-07-05",
//       totalAmount: 1600,
//       status: "active",
//     },
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 2;

//   const filteredOrders = useMemo(() => {
//     return orders.filter((order) =>
//       order.itemName.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [orders, searchTerm]);

//   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

//   const paginatedOrders = useMemo(() => {
//     const start = (currentPage - 1) * itemsPerPage;
//     return filteredOrders.slice(start, start + itemsPerPage);
//   }, [filteredOrders, currentPage]);

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "short", day: "numeric" };
//     return new Date(dateString).toLocaleDateString("en-US", options);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Search */}
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-6">
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search orders..."
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="pl-9 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Order ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Item
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Owner
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Rental Period
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {paginatedOrders.map((order) => (
//                 <tr key={order.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {order.id}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {order.itemName}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {order.owner}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {formatDate(order.startDate)} - {formatDate(order.endDate)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
//                     {formatCurrency(order.totalAmount)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         order.status === "active"
//                           ? "bg-green-100 text-green-800"
//                           : order.status === "completed"
//                           ? "bg-blue-100 text-blue-800"
//                           : "bg-yellow-100 text-yellow-800"
//                       }`}
//                     >
//                       {order.status.charAt(0).toUpperCase() +
//                         order.status.slice(1)}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <button className="text-indigo-600 hover:text-indigo-900">
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Pagination */}
//           {filteredOrders.length > 0 && (
//             <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
//               {/* Mobile View */}
//               <div className="flex-1 flex justify-between sm:hidden">
//                 <button
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.max(prev - 1, 1))
//                   }
//                   disabled={currentPage === 1}
//                   className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                   }
//                   disabled={currentPage === totalPages}
//                   className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Next
//                 </button>
//               </div>

//               {/* Desktop View */}
//               <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                 <div>
//                   <p className="text-sm text-gray-700">
//                     Showing{" "}
//                     <span className="font-medium">
//                       {(currentPage - 1) * itemsPerPage + 1}
//                     </span>{" "}
//                     to{" "}
//                     <span className="font-medium">
//                       {Math.min(
//                         currentPage * itemsPerPage,
//                         filteredOrders.length
//                       )}
//                     </span>{" "}
//                     of{" "}
//                     <span className="font-medium">{filteredOrders.length}</span>{" "}
//                     results
//                   </p>
//                 </div>
//                 <div>
//                   <nav
//                     className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
//                     aria-label="Pagination"
//                   >
//                     <button
//                       onClick={() =>
//                         setCurrentPage((prev) => Math.max(prev - 1, 1))
//                       }
//                       disabled={currentPage === 1}
//                       className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <span className="sr-only">Previous</span>
//                       <ChevronLeft className="h-5 w-5" />
//                     </button>
//                     {[...Array(totalPages)].map((_, i) => (
//                       <button
//                         key={i}
//                         onClick={() => setCurrentPage(i + 1)}
//                         className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                           currentPage === i + 1
//                             ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
//                             : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
//                         }`}
//                       >
//                         {i + 1}
//                       </button>
//                     ))}
//                     <button
//                       onClick={() =>
//                         setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                       }
//                       disabled={currentPage === totalPages}
//                       className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <span className="sr-only">Next</span>
//                       <ChevronRight className="h-5 w-5" />
//                     </button>
//                   </nav>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyOrders;
"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, Eye } from "lucide-react";

const MyOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD123456",
      itemName: "DSLR Camera",
      owner: "John Doe",
      startDate: "2023-04-15",
      endDate: "2023-04-20",
      totalAmount: 2500,
      status: "completed",
    },
    {
      id: "ORD789012",
      itemName: "Mountain Bike",
      owner: "Jane Smith",
      startDate: "2023-05-10",
      endDate: "2023-05-15",
      totalAmount: 1800,
      status: "active",
    },
    {
      id: "ORD345678",
      itemName: "Camping Tent",
      owner: "Mike Johnson",
      startDate: "2023-06-01",
      endDate: "2023-06-05",
      totalAmount: 1200,
      status: "upcoming",
    },
    {
      id: "ORD999999",
      itemName: "GoPro",
      owner: "Alice Brown",
      startDate: "2023-07-01",
      endDate: "2023-07-05",
      totalAmount: 1600,
      status: "active",
    },
    {
      id: "ORD123456",
      itemName: "DSLR Camera",
      owner: "John Doe",
      startDate: "2023-04-15",
      endDate: "2023-04-20",
      totalAmount: 2500,
      status: "completed",
    },
    {
      id: "ORD789012",
      itemName: "Mountain Bike",
      owner: "Jane Smith",
      startDate: "2023-05-10",
      endDate: "2023-05-15",
      totalAmount: 1800,
      status: "active",
    },
    {
      id: "ORD345678",
      itemName: "Camping Tent",
      owner: "Mike Johnson",
      startDate: "2023-06-01",
      endDate: "2023-06-05",
      totalAmount: 1200,
      status: "upcoming",
    },
    {
      id: "ORD999999",
      itemName: "GoPro",
      owner: "Alice Brown",
      startDate: "2023-07-01",
      endDate: "2023-07-05",
      totalAmount: 1600,
      status: "active",
    },
    {
      id: "ORD123456",
      itemName: "DSLR Camera",
      owner: "John Doe",
      startDate: "2023-04-15",
      endDate: "2023-04-20",
      totalAmount: 2500,
      status: "completed",
    },
    {
      id: "ORD789012",
      itemName: "Mountain Bike",
      owner: "Jane Smith",
      startDate: "2023-05-10",
      endDate: "2023-05-15",
      totalAmount: 1800,
      status: "active",
    },
    {
      id: "ORD345678",
      itemName: "Camping Tent",
      owner: "Mike Johnson",
      startDate: "2023-06-01",
      endDate: "2023-06-05",
      totalAmount: 1200,
      status: "upcoming",
    },
    {
      id: "ORD999999",
      itemName: "GoPro",
      owner: "Alice Brown",
      startDate: "2023-07-01",
      endDate: "2023-07-05",
      totalAmount: 1600,
      status: "active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 5;

  // Get unique statuses for filter dropdown
  const statuses = useMemo(() => {
    const uniqueStatuses = [...new Set(orders.map((order) => order.status))];
    return ["all", ...uniqueStatuses];
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        selectedStatus === "all" || order.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, selectedStatus]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  // Reset to first page when search term or status changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rental Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    Loading orders...
                  </td>
                </tr>
              ) : paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    {filteredOrders.length === 0
                      ? "No orders found."
                      : "No orders match your search criteria."}
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order, index) => (
                  <tr key={`${order.id}-${index}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.itemName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.owner}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(order.startDate)} -{" "}
                      {formatDate(order.endDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === "active"
                            ? "bg-green-100 text-green-800"
                            : order.status === "completed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
            {/* Mobile View */}
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>

            {/* Desktop View */}
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      currentPage * itemsPerPage,
                      filteredOrders.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredOrders.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === i + 1
                          ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
