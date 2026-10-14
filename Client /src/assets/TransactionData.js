import { FaTag, FaGavel } from "react-icons/fa";

export const transactionData = [
  {
    id: 1,
    cardBg: "bg-white",
    textColor: "text-black",
    descColor: "text-gray-500",
    iconBg: "bg-black text-white",
    numberBg: "bg-[#1A65D6] text-white",
    buttonClass: "bg-black text-white hover:bg-gray-800",
    buttonText: "List Your Property",
    icon: FaTag,
    title: "For Sellers",
    steps: [
      {
        title: "Professional Valuation",
        desc: "AI-Powered Market Analysis Paired With Expert Appraisal For The Perfect Listing Price.",
      },
      {
        title: "Global Exposure",
        desc: "Your Property Featured Across Our Elite Network Of Global High-Net-Worth Investors.",
      },
      {
        title: "Concierge Closing",
        desc: "Dedicated Transaction Managers Handle Every Legal And Administrative Detail.",
      },
    ],
  },
  {
    id: 2,
    cardBg: "bg-[#111726]",
    textColor: "text-white",
    descColor: "text-gray-400",
    iconBg: "bg-[#0A5FD9] text-white",
    numberBg: "bg-[#1C1294] text-white",
    buttonClass: "bg-[#0A5FD9] text-white hover:bg-blue-700",
    buttonText: "Join Live Auction",
    icon: FaGavel,
    title: "For Bidders",
    steps: [
      {
        title: "Verified Registration",
        desc: "Secure KYC And Financial Vetting To Ensure A Fair And Premium Auction Environment.",
      },
      {
        title: "Real-Time Bidding",
        desc: "Ultra-Low Latency Bidding Engine With Instant Notifications And Property Updates.",
      },
      {
        title: "Instant Ownership",
        desc: "Automated Smart Contracts Facilitate Rapid Transition Of Ownership Post Auction.",
      },
    ],
  },
];