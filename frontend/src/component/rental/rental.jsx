import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import RazorpayButton from "../payment/payment"


export default function RentItemCard() {
  const Location = useLocation();
  const item = Location.state?.itemData;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const calculateDays = (start, end) => {
      const diffTime = Math.abs(end - start);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    };

    const days = calculateDays(startDate, endDate);
    setTotalAmount(days * quantity * item.pricePerDay);
  }, [startDate, endDate, quantity, item.pricePerDay]);

  if (!item) {
    return <div className="text-center py-10 text-red-500">No item data found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 bg-white rounded-2xl shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full">
          <img
            src={item.images}
            alt={item.title}
            className="w-full h-auto rounded-xl object-contain max-h-[400px] md:max-h-[500px]"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800">{item.title}</h2>
          <p className="text-gray-700">{item.description}</p>

          <div className="bg-orange-50 p-4 md:p-6 rounded-xl space-y-4">
            <h3 className="text-lg font-semibold">Select Duration</h3>
            <p className="text-sm text-gray-600">Rent ₹{item.pricePerDay}/Day</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Start Date:</label>
                <input
                  type="date"
                  value={format(startDate, "yyyy-MM-dd")}
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                  className="w-full border rounded px-2 py-2"
                />
              </div>
              <div>
                <label className="font-medium">End Date:</label>
                <input
                  type="date"
                  value={format(endDate, "yyyy-MM-dd")}
                  onChange={(e) => setEndDate(new Date(e.target.value))}
                  className="w-full border rounded px-2 py-2"
                />
              </div>
            </div>

            <div>
              <label className="font-medium">Quantity</label>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center border rounded"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="font-medium">Your Location</label>
              <input
                type="text"
                placeholder="Enter city"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border rounded px-2 py-2 mt-1"
                required
              />
            </div>

            <div className="text-lg font-semibold text-green-600">
              Total Amount: ₹{totalAmount.toLocaleString("en-IN")}
            </div>

            <button className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
             <RazorpayButton item={item} amount={totalAmount * 100}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
