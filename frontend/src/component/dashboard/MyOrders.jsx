import React, { useState } from 'react'
import {Search} from "lucide-react"

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
      ])

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount)
    }

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "short", day: "numeric" }
        return new Date(dateString).toLocaleDateString("en-US", options)
    }
  return (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-6">
        <div className="flex items-center space-x-4">
            <div className="relative">
            <input
                type="text"
                placeholder="Search orders..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <select className="border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
            </select>
        </div>
        </div>

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
                {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.itemName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.owner}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                        {formatDate(order.startDate)} - {formatDate(order.endDate)}
                    </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-indigo-600">
                        {formatCurrency(order.totalAmount)}
                    </div>
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
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">View Details</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    </div>
  )
}

export default MyOrders