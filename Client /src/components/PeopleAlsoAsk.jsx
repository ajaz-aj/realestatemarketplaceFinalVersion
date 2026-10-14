import React from "react";
import { ChevronDown } from "lucide-react";

const PeopleAlsoAsk = () => {
  const faqs = [
    "What Is The Minimum Investment Required ?",
    "Are The Advisors Certified ?",
    "Can You Help Me Choose The Right Investment Property?",
    "How Long Does A Consultation Usually Take?",
    "Will My Information Remain Confidential?",
  ];

  return (
    <div className="flex-1 rounded-[22px] bg-[#050505] p-10 text-white">
      {/* Header */}
      <div className="mb-10">
        <h2 className="mb-2 text-[26px] font-bold tracking-wide">People Also Ask</h2>
        <p className="text-[15px] text-[#aaa]">
          Find Answers To Our Most Frequent Investment Consultation Questions
        </p>
      </div>

      {/* FAQ List */}
      <div className="flex flex-col">
        {faqs.map((question, index) => (
          <div
            key={index}
            className="group flex cursor-pointer items-center justify-between border-b border-[#221c11] py-6 transition-colors hover:border-[#c98508]"
          >
            <h3 className="text-[16px] font-medium text-[#ccc] group-hover:text-white">
              {question}
            </h3>
            <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#0a1833] text-white transition-colors group-hover:bg-[#0f244d]">
              <ChevronDown size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeopleAlsoAsk;