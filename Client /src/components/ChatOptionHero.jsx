import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ChatOptionHero() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#111111]">
      <div className="mx-auto max-w-7xl px-8 py-16">

        {/* Top Right Back Button */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-black px-6 py-3 text-white transition hover:border-[#C58A17]"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        {/* Content */}
        <div className="mt-10 max-w-3xl">

          {/* Badge */}
          <p className="text-sm font-semibold uppercase tracking-[4px] text-[#C58A17]">
            Expert Consultation
          </p>

          {/* Heading */}
          <h1 className="mt-6 font-serif text-6xl font-semibold leading-tight text-white">
            Speak With An Investment
            <br />
            Advisor
          </h1>

          {/* Description */}
          <p className="mt-6 text-xl leading-9 text-gray-400">
            Connect With Our Certified Real Estate Investment
            Specialists For Personalized Guidance, Portfolio
            Planning, And Exclusive Investment Opportunities.
          </p>

        </div>

      </div>
    </section>
  );
}

export default ChatOptionHero;