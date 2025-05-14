// import { useState, useMemo, useEffect } from "react";
// import { Search, ChevronLeft, ChevronRight } from "lucide-react";

// const Transactions = ({ user }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedType, setSelectedType] = useState("all");
//   const [loading, setLoading] = useState(false);
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
//     {
//       id: "TXN111111",
//       date: "2023-07-15",
//       description: "Earnings from Laptop rental",
//       amount: 2800,
//       type: "credit",
//     },
//     {
//       id: "TXN222222",
//       date: "2023-07-20",
//       description: "Payment for Kayak rental",
//       amount: -1600,
//       type: "debit",
//     },
//     {
//       id: "TXN333333",
//       date: "2023-07-25",
//       description: "Earnings from Guitar rental",
//       amount: 1200,
//       type: "credit",
//     },
//     {
//       id: "TXN444444",
//       date: "2023-08-01",
//       description: "Payment for Camping Gear rental",
//       amount: -2200,
//       type: "debit",
//     },
//   ];

//   // Get unique transaction types for filter dropdown
//   const types = useMemo(() => {
//     return ["all", "credit", "debit"];
//   }, []);

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
//     return transactions.filter((txn) => {
//       const matchesSearch =
//         txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         txn.id.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesType = selectedType === "all" || txn.type === selectedType;
//       return matchesSearch && matchesType;
//     });
//   }, [searchTerm, selectedType, transactions]);

//   const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

//   const paginatedTransactions = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
//   }, [filteredTransactions, currentPage, itemsPerPage]);

//   // Reset to first page when search term or type changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, selectedType]);

//   // Calculate summary values
//   const totalIncome = useMemo(() => {
//     return transactions
//       .filter((t) => t.type === "credit")
//       .reduce((acc, t) => acc + t.amount, 0);
//   }, [transactions]);

//   const totalExpenses = useMemo(() => {
//     return transactions
//       .filter((t) => t.type === "debit")
//       .reduce((acc, t) => acc + Math.abs(t.amount), 0);
//   }, [transactions]);
// import React, { useState,useEffect } from 'react'
// import {Search} from "lucide-react"
// import { getSessionData } from '../../services/session.service'

// const Transactions = ({user}) => {
//     const email=getSessionData('email')

//     const [transactions, setTransactions] = useState([
//         {
//           id: "TXN123456",
//           date: "2023-04-20",
//           description: "Payment for DSLR Camera rental",
//           amount: -2500,
//           type: "debit",
//         },
//         {
//           id: "TXN789012",
//           date: "2023-05-05",
//           description: "Earnings from Drone rental",
//           amount: 3500,
//           type: "credit",
//         },
//         {
//           id: "TXN345678",
//           date: "2023-05-15",
//           description: "Payment for Mountain Bike rental",
//           amount: -1800,
//           type: "debit",
//         },
//         {
//           id: "TXN901234",
//           date: "2023-05-25",
//           description: "Earnings from Projector rental",
//           amount: 2200,
//           type: "credit",
//         },
//         {
//           id: "TXN567890",
//           date: "2023-06-10",
//           description: "Earnings from Speaker rental",
//           amount: 1500,
//           type: "credit",
//         },
//       ])
//        const [showPopup, setShowPopup] = useState(false);
//   const [method, setMethod] = useState("");
//   const [bank, setBank] = useState("");
//   const [upiId, setUpiId] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [amount, setAmount] = useState(0);

//   async function fetchData() {
//   try {
//     const [transactionsRes, balanceRes] = await Promise.all([
//       fetch(`${import.meta.env.VITE_API_BASE_URL}/payment/transaction/${email}`),
//       fetch(`${import.meta.env.VITE_API_BASE_URL}/payment/account-balance/${email}`)
//     ]);

//     if (!transactionsRes.ok || !balanceRes.ok) {
//       throw new Error("Failed to fetch data");
//     }

//     const transactionsData = await transactionsRes.json();
//     const balanceData = await balanceRes.json();
//       const balanceAmount =( balanceData?.balance?.instant_available?.[0]?.amount || 0)-amount;

//     setTransactions(transactionsData);
//     localStorage.setItem("balance",balanceAmount)
//   } catch (error) {
//     console.error("Error fetching payment data:", error);
//     // Optionally: set error state here
//   }
// }

//       useEffect(()=>{
//         fetchData()
//       },[])
//    const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-AU", {
//         style: "currency",
//         currency: "AUD",
//         maximumFractionDigits: 0,
//     }).format(amount);
// };

//   const formatDate = (createdAt) => {
//   const date = new Date(createdAt);
//   const options = { year: "numeric", month: "short", day: "numeric" };
//   return date.toLocaleDateString("en-US", options); // e.g., "May 13, 2025"
// };
// const handleConfirm = () => {
//     if (method === "upi") {
//       if (!upiId.endsWith("@ybl")) {
//         alert("UPI ID must end with @ybl");
//         return;
//       }
//       alert(`Processing payout to UPI: ${upiId}`);
//     } else if (method === "bank") {
//       if (!bank || !accountNumber) {
//         alert("Please select a bank and enter account number");
//         return;
//       }
//     const currentBalance = Number(localStorage.getItem('balance') || 0);
// const newBalance = currentBalance - Number(amount);
// localStorage.setItem('balance', newBalance);

//     }
//     setShowPopup(false);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-6">
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search transactions..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-9 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//             <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//           </div>
//             </div>
//             <select className="border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
//             <option value="all">All Transactions</option>
//             <option value="credit">Credits</option>
//             <option value="debit">Debits</option>
//             </select>
//         </div>
//         <div className="p-4">
//       {/* Trigger Button */}
//       <div className="flex space-x-2">
//         <button
//           onClick={() => setShowPopup(true)}
//           className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-colors"
//         >
//           Payout
//         </button>
//       </div>

//       {/* Popup Overlay */}
//       {showPopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
//           <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
//             <h2 className="text-xl font-semibold mb-4 text-center">Select Payout Method</h2>

//             {/* Payout Method Dropdown */}
//             <select
//               value={method}
//               onChange={(e) => {
//                 setMethod(e.target.value);
//                 setBank("");
//                 setAccountNumber("");
//                 setUpiId("");
//               }}
//               className="w-full p-2 border rounded mb-4"
//             >
//               <option value="">-- Choose Method --</option>
//               <option value="upi">UPI</option>
//               <option value="bank">Bank</option>
//             </select>

//             {/* UPI Input */}
//             {method === "upi" && (
//               <input
//                 type="text"
//                 placeholder="Enter UPI ID"
//                 value={upiId}
//                 onChange={(e) => setUpiId(e.target.value)}
//                 className="w-full p-2 border rounded mb-4"
//               />
//             )}

//             {/* Bank Select + Account Input */}
//             {method === "bank" && (
//               <>
//                 <select
//                   value={bank}
//                   onChange={(e) => setBank(e.target.value)}
//                   className="w-full p-2 border rounded mb-4"
//                 >
//                   <option value="">-- Select Bank --</option>
//                   <option value="SBI">SBI</option>
//                   <option value="BOB">BOB</option>
//                   <option value="ICICI">ICICI</option>
//                   <option value="HDFC">HDFC</option>
//                 </select>
//                 <input
//                   type="text"
//                   placeholder="Enter Account Number"
//                   value={accountNumber}
//                   onChange={(e) => setAccountNumber(e.target.value)}
//                   className="w-full p-2 border rounded mb-4"
//                 />
//               </>
//             )}
//             <input
//   type="number"
//   placeholder="Enter Amount (AUD)"
//   value={amount}
//   onChange={(e) => setAmount(e.target.value)}
//   className="w-full p-2 border rounded mb-4"
//   min="0"
//   step="0.01"
// />

//             {/* Buttons */}
//             <div className="flex justify-between space-x-4">
//               <button
//                 onClick={handleConfirm}
//                 className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded hover:from-purple-700 hover:to-indigo-700 transition-colors"
//               >
//                 Confirm Payout
//               </button>
//               <button
//                 onClick={() => setShowPopup(false)}
//                 className="flex-1 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//         </div>
//       </div>

//       {/* Summary */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         {/* Balance */}
//         <div className="bg-white p-6 rounded-xl shadow-sm">
//           <div className="flex justify-between items-start">
//             <div>
//                 <p className="text-sm font-medium text-gray-500">Total Balance</p>
//                 <h3 className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(localStorage.getItem("balance") || 0)}</h3>
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
//                 {formatCurrency(totalIncome)}
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
//                 {formatCurrency(totalExpenses)}
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
//               {loading ? (
//                 <tr>
//                   <td colSpan="5" className="px-6 py-4 text-center">
//                     Loading transactions...
//                   </td>
//                 </tr>
//               ) : paginatedTransactions.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="px-6 py-4 text-center">
//                     {filteredTransactions.length === 0
//                       ? "No transactions found."
//                       : "No transactions match your search criteria."}
//                   </td>
//                 </tr>
//               ) : (
//                 paginatedTransactions.map((transaction) => (
//                   <tr key={transaction._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {transaction?.transection_id}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {formatDate(transaction?.createdAt)}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {transaction?.item_id?.title}
//                     </td>
//                     <td
//                       className={`px-6 py-4 text-right text-sm font-medium ${
//                         txn.type === "credit"
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {transaction.type === "credit" ? "+" : "-"}
//                       {formatCurrency(Math.abs(transaction?.amount))}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-2 inline-flex text-xs font-semibold rounded-full ${
//                           txn.type === "credit"
//                             ? "bg-green-100 text-green-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {txn.type === "credit" ? "Completed" : "Paid"}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {filteredTransactions.length > 0 && (
//           <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
//             {/* Mobile View */}
//             <div className="flex-1 flex justify-between sm:hidden">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//                 className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Next
//               </button>
//             </div>

//             {/* Desktop View */}
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
import { useState, useMemo, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { getSessionData } from "../../services/session.service";

const Transactions = ({ user }) => {
  const email = getSessionData("email");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState("all");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [method, setMethod] = useState("");
  const [bank, setBank] = useState("");
  const [upiId, setUpiId] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const itemsPerPage = 5;

  const [transactions, setTransactions] = useState([
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
  ]);

  async function fetchData() {
    try {
      const [transactionsRes, balanceRes] = await Promise.all([
        fetch(
          `${import.meta.env.VITE_API_BASE_URL}/payment/transaction/${email}`
        ),
        fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/payment/account-balance/${email}`
        ),
      ]);

      if (!transactionsRes.ok || !balanceRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const transactionsData = await transactionsRes.json();
      const balanceData = await balanceRes.json();
      const balanceAmount =
        (balanceData?.balance?.instant_available?.[0]?.amount || 0) - amount;

      setTransactions(transactionsData);
      localStorage.setItem("balance", balanceAmount);
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Get unique transaction types for filter dropdown
  const types = useMemo(() => {
    return ["all", "credit", "debit"];
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

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

  const handleConfirm = () => {
    if (method === "upi") {
      if (!upiId.endsWith("@ybl")) {
        alert("UPI ID must end with @ybl");
        return;
      }
      alert(`Processing payout to UPI: ${upiId}`);
    } else if (method === "bank") {
      if (!bank || !accountNumber) {
        alert("Please select a bank and enter account number");
        return;
      }
      const currentBalance = Number(localStorage.getItem("balance") || 0);
      const newBalance = currentBalance - Number(amount);
      localStorage.setItem("balance", newBalance);
    }
    setShowPopup(false);
  };

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
        <select
          className="border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">All Transactions</option>
          <option value="credit">Credits</option>
          <option value="debit">Debits</option>
        </select>
      </div>

      <div className="p-4">
        {/* Trigger Button */}
        <div className="flex space-x-2">
          <button
            onClick={() => setShowPopup(true)}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-colors"
          >
            Payout
          </button>
        </div>

        {/* Popup Overlay */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Select Payout Method
              </h2>

              {/* Payout Method Dropdown */}
              <select
                value={method}
                onChange={(e) => {
                  setMethod(e.target.value);
                  setBank("");
                  setAccountNumber("");
                  setUpiId("");
                }}
                className="w-full p-2 border rounded mb-4"
              >
                <option value="">-- Choose Method --</option>
                <option value="upi">UPI</option>
                <option value="bank">Bank</option>
              </select>

              {/* UPI Input */}
              {method === "upi" && (
                <input
                  type="text"
                  placeholder="Enter UPI ID"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                />
              )}

              {/* Bank Select + Account Input */}
              {method === "bank" && (
                <>
                  <select
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                  >
                    <option value="">-- Select Bank --</option>
                    <option value="SBI">SBI</option>
                    <option value="BOB">BOB</option>
                    <option value="ICICI">ICICI</option>
                    <option value="HDFC">HDFC</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Enter Account Number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                  />
                </>
              )}
              <input
                type="number"
                placeholder="Enter Amount (AUD)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                min="0"
                step="0.01"
              />

              {/* Buttons */}
              <div className="flex justify-between space-x-4">
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded hover:from-purple-700 hover:to-indigo-700 transition-colors"
                >
                  Confirm Payout
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Balance */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Balance</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {formatCurrency(localStorage.getItem("balance") || 0)}
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
                  Title
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
                paginatedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {transaction.transection_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatDate(transaction.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {transaction?.item_id?.title}
                    </td>
                    <td
                      className={`px-6 py-4 text-right text-sm font-medium ${
                        transaction.type === "credit"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "credit" ? "+" : "-"}
                      {formatCurrency(Math.abs(transaction?.amount))}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                          transaction.type === "credit"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction?.type === "credit" ? "Completed" : "Paid"}
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
