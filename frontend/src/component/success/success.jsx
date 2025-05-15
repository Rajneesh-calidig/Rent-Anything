
import React from "react";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full text-center p-8 md:p-12 border border-green-200">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full shadow-md animate-pulse">
            <CheckCircle className="text-green-600" size={64} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-green-700 mb-2">
          Payment Successful
        </h1>

        {/* Subtext (optional) */}
        <p className="text-gray-500 text-lg mb-6">
          Your delivery is now on its way!
        </p>

        {/* Custom Image */}


        {/* Button */}
        <button className="bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white font-semibold px-8 py-3 rounded-full shadow-lg">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}