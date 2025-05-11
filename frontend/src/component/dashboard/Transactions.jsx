// import React, { useState } from "react";
// import { Search } from "lucide-react";

// const Transactions = ({ user }) => {
//   const [transactions, setTransactions] = useState([
//     {
//       id: "TXN123456",
//       date: "2023-04-20",
//       description: "Payment for DSLR Camera rental",
//       amount: -2500,
//       type: "debit",
//     },
//     {
//       id: "TXN789012",
//       date: "2023-05-05",
//       description: "Earnings from Drone rental",
//       amount: 3500,
//       type: "credit",
//     },
//     {
//       id: "TXN345678",
//       date: "2023-05-15",
//       description: "Payment for Mountain Bike rental",
//       amount: -1800,
//       type: "debit",
//     },
//     {
//       id: "TXN901234",
//       date: "2023-05-25",
//       description: "Earnings from Projector rental",
//       amount: 2200,
//       type: "credit",
//     },
//     {
//       id: "TXN567890",
//       date: "2023-06-10",
//       description: "Earnings from Speaker rental",
//       amount: 1500,
//       type: "credit",
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
//               placeholder="Search transactions..."
//               className="pl-9 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//           </div>
//         </div>
//         <div className="flex space-x-2">
//           <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors">
//             Export
//           </button>
//           <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-colors">
//             Filter
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <div className="bg-white p-6 rounded-xl shadow-sm">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Total Balance</p>
//               <h3 className="text-2xl font-bold text-gray-800 mt-1">
//                 {formatCurrency(user?.earnings)}
//               </h3>
//             </div>
//             <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Total Income</p>
//               <h3 className="text-2xl font-bold text-green-600 mt-1">
//                 {formatCurrency(7200)}
//               </h3>
//             </div>
//             <div className="p-2 bg-green-100 rounded-lg text-green-600">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M7 11l5-5m0 0l5 5m-5-5v12"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm font-medium text-gray-500">
//                 Total Expenses
//               </p>
//               <h3 className="text-2xl font-bold text-red-600 mt-1">
//                 {formatCurrency(4300)}
//               </h3>
//             </div>
//             <div className="p-2 bg-red-100 rounded-lg text-red-600">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17 13l-5 5m0 0l-5-5m5 5V6"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Transaction ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Description
//                 </th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {transactions.map((transaction) => (
//                 <tr key={transaction.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {transaction.id}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">
//                       {formatDate(transaction.date)}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-gray-900">
//                       {transaction.description}
//                     </div>
//                   </td>
//                   <td
//                     className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${
//                       transaction.type === "credit"
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {transaction.type === "credit" ? "+" : "-"}
//                     {formatCurrency(Math.abs(transaction.amount))}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         transaction.type === "credit"
//                           ? "bg-green-100 text-green-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {transaction.type === "credit" ? "Completed" : "Paid"}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="px-6 py-4 border-t">
//           <div className="flex justify-between items-center">
//             <div className="text-sm text-gray-500">
//               Showing <span className="font-medium">1</span> to{" "}
//               <span className="font-medium">5</span> of{" "}
//               <span className="font-medium">20</span> transactions
//             </div>
//             <div className="flex space-x-2">
//               <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
//                 Previous
//               </button>
//               <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Transactions;
// import React, { useState, useMemo } from "react";
// import { Search, ChevronLeft, ChevronRight } from "lucide-react";

// const Transactions = ({ user }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const transactions = [
//     {
//       id: "TXN123456",
//       date: "2023-04-20",
//       description: "Payment for DSLR Camera rental",
//       amount: -2500,
//       type: "debit",
//     },
//     {
//       id: "TXN789012",
//       date: "2023-05-05",
//       description: "Earnings from Drone rental",
//       amount: 3500,
//       type: "credit",
//     },
//     {
//       id: "TXN345678",
//       date: "2023-05-15",
//       description: "Payment for Mountain Bike rental",
//       amount: -1800,
//       type: "debit",
//     },
//     {
//       id: "TXN901234",
//       date: "2023-05-25",
//       description: "Earnings from Projector rental",
//       amount: 2200,
//       type: "credit",
//     },
//     {
//       id: "TXN567890",
//       date: "2023-06-10",
//       description: "Earnings from Speaker rental",
//       amount: 1500,
//       type: "credit",
//     },
//     {
//       id: "TXN999999",
//       date: "2023-07-11",
//       description: "Payment for Treadmill rental",
//       amount: -1200,
//       type: "debit",
//     },
//   ];

//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(amount);

//   const formatDate = (dateString) =>
//     new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });

//   const filteredTransactions = useMemo(() => {
//     return transactions.filter((txn) =>
//       txn.description.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [searchQuery, transactions]);

//   const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
//   const paginatedTransactions = filteredTransactions.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-6">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search transactions..."
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="pl-9 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//         </div>
//       </div>

//       {/* Summary */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         {/* Balance */}
//         <div className="bg-white p-6 rounded-xl shadow-sm">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Total Balance</p>
//               <h3 className="text-2xl font-bold text-gray-800 mt-1">
//                 {formatCurrency(user?.earnings || 0)}
//               </h3>
//             </div>
//             <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white">
//               ₹
//             </div>
//           </div>
//         </div>
//         {/* Income */}
//         <div className="bg-white p-6 rounded-xl shadow-sm">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Total Income</p>
//               <h3 className="text-2xl font-bold text-green-600 mt-1">
//                 {formatCurrency(
//                   transactions
//                     .filter((t) => t.type === "credit")
//                     .reduce((acc, t) => acc + t.amount, 0)
//                 )}
//               </h3>
//             </div>
//             <div className="p-2 bg-green-100 rounded-lg text-green-600">↑</div>
//           </div>
//         </div>
//         {/* Expenses */}
//         <div className="bg-white p-6 rounded-xl shadow-sm">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm font-medium text-gray-500">
//                 Total Expenses
//               </p>
//               <h3 className="text-2xl font-bold text-red-600 mt-1">
//                 {formatCurrency(
//                   transactions
//                     .filter((t) => t.type === "debit")
//                     .reduce((acc, t) => acc + Math.abs(t.amount), 0)
//                 )}
//               </h3>
//             </div>
//             <div className="p-2 bg-red-100 rounded-lg text-red-600">↓</div>
//           </div>
//         </div>
//       </div>

//       {/* Transactions Table */}
//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Transaction ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Description
//                 </th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
//                   Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Status
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {paginatedTransactions.map((txn) => (
//                 <tr key={txn.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 text-sm text-gray-500">{txn.id}</td>
//                   <td className="px-6 py-4 text-sm text-gray-900">
//                     {formatDate(txn.date)}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-900">
//                     {txn.description}
//                   </td>
//                   <td
//                     className={`px-6 py-4 text-right text-sm font-medium ${
//                       txn.type === "credit" ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     {txn.type === "credit" ? "+" : "-"}
//                     {formatCurrency(Math.abs(txn.amount))}
//                   </td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`px-2 inline-flex text-xs font-semibold rounded-full ${
//                         txn.type === "credit"
//                           ? "bg-green-100 text-green-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {txn.type === "credit" ? "Completed" : "Paid"}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {!searchQuery && filteredTransactions.length > 0 && (
//           <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
//             <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//               <div>
//                 <p className="text-sm text-gray-700">
//                   Showing{" "}
//                   <span className="font-medium">
//                     {(currentPage - 1) * itemsPerPage + 1}
//                   </span>{" "}
//                   to{" "}
//                   <span className="font-medium">
//                     {Math.min(
//                       currentPage * itemsPerPage,
//                       filteredTransactions.length
//                     )}
//                   </span>{" "}
//                   of{" "}
//                   <span className="font-medium">
//                     {filteredTransactions.length}
//                   </span>{" "}
//                   results
//                 </p>
//               </div>
//               <div>
//                 <nav
//                   className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
//                   aria-label="Pagination"
//                 >
//                   <button
//                     onClick={() =>
//                       setCurrentPage((prev) => Math.max(prev - 1, 1))
//                     }
//                     disabled={currentPage === 1}
//                     className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
//                   >
//                     <span className="sr-only">Previous</span>
//                     <ChevronLeft className="h-5 w-5" />
//                   </button>

//                   {[...Array(totalPages)].map((_, i) => (
//                     <button
//                       key={i}
//                       onClick={() => setCurrentPage(i + 1)}
//                       className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                         currentPage === i + 1
//                           ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
//                           : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
//                       }`}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}

//                   <button
//                     onClick={() =>
//                       setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                     }
//                     disabled={currentPage === totalPages}
//                     className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
//                   >
//                     <span className="sr-only">Next</span>
//                     <ChevronRight className="h-5 w-5" />
//                   </button>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Transactions;
"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const Transactions = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState("all");
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 5;

  const transactions = [
    {
      id: "TXN123456",
      date: "2023-04-20",
      description: "Payment for DSLR Camera rental",
      amount: -2500,
      type: "debit",
    },
    {
      id: "TXN789012",
      date: "2023-05-05",
      description: "Earnings from Drone rental",
      amount: 3500,
      type: "credit",
    },
    {
      id: "TXN345678",
      date: "2023-05-15",
      description: "Payment for Mountain Bike rental",
      amount: -1800,
      type: "debit",
    },
    {
      id: "TXN901234",
      date: "2023-05-25",
      description: "Earnings from Projector rental",
      amount: 2200,
      type: "credit",
    },
    {
      id: "TXN567890",
      date: "2023-06-10",
      description: "Earnings from Speaker rental",
      amount: 1500,
      type: "credit",
    },
    {
      id: "TXN999999",
      date: "2023-07-11",
      description: "Payment for Treadmill rental",
      amount: -1200,
      type: "debit",
    },
    {
      id: "TXN111111",
      date: "2023-07-15",
      description: "Earnings from Laptop rental",
      amount: 2800,
      type: "credit",
    },
    {
      id: "TXN222222",
      date: "2023-07-20",
      description: "Payment for Kayak rental",
      amount: -1600,
      type: "debit",
    },
    {
      id: "TXN333333",
      date: "2023-07-25",
      description: "Earnings from Guitar rental",
      amount: 1200,
      type: "credit",
    },
    {
      id: "TXN444444",
      date: "2023-08-01",
      description: "Payment for Camping Gear rental",
      amount: -2200,
      type: "debit",
    },
  ];

  // Get unique transaction types for filter dropdown
  const types = useMemo(() => {
    return ["all", "credit", "debit"];
  }, []);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      const matchesSearch =
        txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === "all" || txn.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, selectedType, transactions]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTransactions, currentPage, itemsPerPage]);

  // Reset to first page when search term or type changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType]);

  // Calculate summary values
  const totalIncome = useMemo(() => {
    return transactions
      .filter((t) => t.type === "credit")
      .reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions
      .filter((t) => t.type === "debit")
      .reduce((acc, t) => acc + Math.abs(t.amount), 0);
  }, [transactions]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Balance */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Balance</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {formatCurrency(user?.earnings || totalIncome - totalExpenses)}
              </h3>
            </div>
            <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white">
              ₹
            </div>
          </div>
        </div>
        {/* Income */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Income</p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">
                {formatCurrency(totalIncome)}
              </h3>
            </div>
            <div className="p-2 bg-green-100 rounded-lg text-green-600">↑</div>
          </div>
        </div>
        {/* Expenses */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Expenses
              </p>
              <h3 className="text-2xl font-bold text-red-600 mt-1">
                {formatCurrency(totalExpenses)}
              </h3>
            </div>
            <div className="p-2 bg-red-100 rounded-lg text-red-600">↓</div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    Loading transactions...
                  </td>
                </tr>
              ) : paginatedTransactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    {filteredTransactions.length === 0
                      ? "No transactions found."
                      : "No transactions match your search criteria."}
                  </td>
                </tr>
              ) : (
                paginatedTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {txn.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatDate(txn.date)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {txn.description}
                    </td>
                    <td
                      className={`px-6 py-4 text-right text-sm font-medium ${
                        txn.type === "credit"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {txn.type === "credit" ? "+" : "-"}
                      {formatCurrency(Math.abs(txn.amount))}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                          txn.type === "credit"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {txn.type === "credit" ? "Completed" : "Paid"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredTransactions.length > 0 && (
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
                      filteredTransactions.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {filteredTransactions.length}
                  </span>{" "}
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
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
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
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
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

export default Transactions;
