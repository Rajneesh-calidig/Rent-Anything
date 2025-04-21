import { useState } from "react";
import { getSessionData } from "../../services/session.service";

const razorpayKey = import.meta.env.VITE_key_id;
const RazorpayButton = ({item,amount }) => {
  const [loading, setLoading] = useState(false);
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const userEmail=getSessionData("email")
  const userName=getSessionData("name")


  const payNow = async () => {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(amount)*100, // in paisa
          itemData: item,
        }),
      });
      const data = await res.json();
console.log("our data is",data)
      const options = {
        key: razorpayKey, // Replace with your Razorpay key
        amount: data.amount,
        currency: data.currency,
        name: "My App",
        description: "Test Payment",
        order_id: data.id,
        handler: async function  (response) {
          console.log("Payment Success:", response);
          // Send response to backend for verification
          try {
            const verifyRes = await fetch("https://rent-anything.vercel.app/api/payment/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
        
            const result = await verifyRes.json();
            console.log("Verification result:", result);
            
            if (result.success) {
              alert("Payment Verified Successfully!");
            } else {
              alert("Payment verification failed.");
            }
          } catch (err) {
            console.error("Verification Error:", err);
            alert("Something went wrong during verification.");
          }
        },
        prefill: {
          name: userName,
          email: userEmail,
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={payNow}
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
    >
      {loading ? "Processing..." : "Proceed to Pay"}
    </button>
  );
};

export default RazorpayButton;
