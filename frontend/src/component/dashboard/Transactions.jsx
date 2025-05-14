import React, { useState,useEffect } from 'react'
import {Search} from "lucide-react"
import { getSessionData } from '../../services/session.service'
  

const Transactions = ({user}) => {
    const email=getSessionData('email')

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
      ])
       const [showPopup, setShowPopup] = useState(false);
  const [method, setMethod] = useState("");
  const [bank, setBank] = useState("");
  const [upiId, setUpiId] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState(0);
   
  async function fetchData() {
  try {
    const [transactionsRes, balanceRes] = await Promise.all([
      fetch(`http://localhost:4000/api/payment/transection/${email}`),
      fetch(`http://localhost:4000/api/payment/account-balance/${email}`)
    ]);

    if (!transactionsRes.ok || !balanceRes.ok) {
      throw new Error("Failed to fetch data");
    }

    const transactionsData = await transactionsRes.json();
    const balanceData = await balanceRes.json();
      const balanceAmount =( balanceData?.balance?.instant_available?.[0]?.amount || 0)-amount;

    setTransactions(transactionsData);
    localStorage.setItem("balance",balanceAmount)
  } catch (error) {
    console.error("Error fetching payment data:", error);
    // Optionally: set error state here
  }
}

      useEffect(()=>{
        fetchData()
      },[])
   const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
        maximumFractionDigits: 0,
    }).format(amount);
};

  const formatDate = (createdAt) => {
  const date = new Date(createdAt);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options); // e.g., "May 13, 2025"
};
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
    const currentBalance = Number(localStorage.getItem('balance') || 0);
const newBalance = currentBalance - Number(amount);
localStorage.setItem('balance', newBalance);
    
    }
    setShowPopup(false);
  };

  return (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-6">
        <div className="flex items-center space-x-4">
            <div className="relative">
            <input
                type="text"
                placeholder="Search transactions..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <select className="border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
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
            <h2 className="text-xl font-semibold mb-4 text-center">Select Payout Method</h2>

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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-gray-500">Total Balance</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(localStorage.getItem("balance") || 0)}</h3>
            </div>
            <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                </svg>
            </div>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-gray-500">Total Income</p>
                <h3 className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(7200)}</h3>
            </div>
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                />
                </svg>
            </div>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-gray-500">Total Expenses</p>
                <h3 className="text-2xl font-bold text-red-600 mt-1">{formatCurrency(4300)}</h3>
            </div>
            <div className="p-2 bg-red-100 rounded-lg text-red-600">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 13l-5 5m0 0l-5-5m5 5V6"
                />
                </svg>
            </div>
            </div>
        </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                { transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction?.transection_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(transaction?.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{transaction?.item_id?.title}</div>
                    </td>
                    <td
                    className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${
                        transaction.type === "credit" ?"text-green-600":   "text-red-600"
                    }`}
                    >
                    {transaction.type === "credit" ? "+" : "-"}
                    {formatCurrency(Math.abs(transaction?.amount))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.type === "credit"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                        {transaction.type === "credit" ? "Completed" : "Paid"}
                    </span>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        <div className="px-6 py-4 border-t">
            <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{" "}
                <span className="font-medium">20</span> transactions
            </div>
            <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                Previous
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                Next
                </button>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Transactions