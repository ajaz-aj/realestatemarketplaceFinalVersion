import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGavel } from "react-icons/fa";

function TransactionCard({ item }) {
  const navigate = useNavigate();
  const Icon = item.icon;

  const handleButtonClick = () => {
    if (item.buttonText.toLowerCase().includes("list")) {
      try {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");
        const user = userStr ? JSON.parse(userStr) : null;
        if (token && user && (user.role === "agent" || user.role === "admin")) {
          navigate("/SellOrRentForm");
        } else {
          navigate("/LogIn?role=agent&redirect=/SellOrRentForm");
        }
      } catch {
        navigate("/LogIn?role=agent&redirect=/SellOrRentForm");
      }
    } else if (item.buttonText.toLowerCase().includes("auction")) {
      navigate("/marketplace");
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] p-6 sm:p-10 flex flex-col justify-between ${item.cardBg} ${item.textColor}`}
    >
      {/* Huge Faded Watermark for Bidders Card */}
      {item.title === "For Bidders" && (
        <FaGavel className="absolute -right-12 top-12 text-[150px] sm:text-[200px] text-white/[0.03] -rotate-12 pointer-events-none" />
      )}

      <div className="relative z-10">
        {/* Top Icon */}
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${item.iconBg}`}
        >
          <Icon />
        </div>

        {/* Title */}
        <h2 className="mt-6 text-xl sm:text-[22px] font-bold tracking-tight">
          {item.title}
        </h2>

        {/* Steps List */}
        <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-7">
          {item.steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              {/* Number Circle */}
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-bold mt-0.5 ${item.numberBg}`}
              >
                {index + 1}
              </div>
              
              {/* Text Block */}
              <div>
                <h3 className="text-sm sm:text-[15px] font-bold">{step.title}</h3>
                <p className={`mt-1 text-xs sm:text-[13px] leading-relaxed ${item.descColor}`}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="relative z-10 mt-10 sm:mt-12 flex items-start">
        <button
          onClick={handleButtonClick}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer text-center ${item.buttonClass}`}
        >
          {item.buttonText}
        </button>
      </div>
    </div>
  );
}

export default TransactionCard;