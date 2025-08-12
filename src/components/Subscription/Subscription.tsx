import { useState } from "react";
import { FaCheck, } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import PaymentPopup from "../../paymentGateway/razorpay";

const SubscriptionPlans = () => {
  const [currentPlan, setCurrentPlan] = useState<"Free" | "Pro" | null>(null);
  const [showPopup, setShowPopup] = useState(false);

 

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Free Plan */}
        <div className="border rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-[#03257e] mb-2">Free Plan</h2>
          <ul className="text-[#006666] mb-4">
            <li className="flex items-center gap-2 text-[#03257e]"><FaCheck /> Sharable Link of Edubuk design CV </li>
            <li className="flex items-center gap-2 text-[#03257e]"><FaCheck /> Sharable Link of Template CV</li>
            <li className="flex items-center gap-2 text-[#f14419]"><IoCloseCircleSharp /> Downloadable</li>
          </ul>
          <p className="text-3xl font-bold text-[#f14419] mb-4">₹0/year</p>
          <button
            disabled
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-not-allowed"
          >
            {currentPlan === "Free" ? "Current Plan" : "Downgrade"}
          </button>
        </div>

        {/* Pro Plan */}
        <div className="border rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-[#03257e] mb-2">Pro Plan</h2>
          <ul className="text-[#006666] mb-4">
            <li className="flex items-center gap-2 text-[#03257e]"><FaCheck /> Sharable Link of Edubuk design CV </li>
            <li className="flex items-center gap-2 text-[#03257e]"><FaCheck /> Sharable Link of Template CV</li>
            <li className="flex items-center gap-2 text-[#03257e]"><FaCheck /> Downloadable</li>
          </ul>
          <p className="text-3xl font-bold text-[#f14419] mb-4">₹590/year<br></br><i className="text-gray-400  text-xs">18% GST included</i></p>
          {currentPlan === "Pro" ? (
            <button
              disabled
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-not-allowed"
            >
              Current Plan
            </button>
          ) : (
            <button
              onClick={()=>setShowPopup(true)}
              className="bg-[#03257e] text-white px-4 py-2 rounded hover:bg-[#006666]"
              
            >
              Upgrade to Pro
            </button>
          )}
        </div>
      </div>
      <PaymentPopup showPopup={showPopup} setShowPopup={setShowPopup}/>
    </div>
  );
};

export default SubscriptionPlans;
