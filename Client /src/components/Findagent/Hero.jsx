import { PiShieldCheckBold } from "react-icons/pi";
import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0A0806] px-4 pt-20 pb-16 text-center">
      {/* subtle warm glow behind headline */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 bg-amber-600/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-gray-300">
          <PiShieldCheckBold className="text-amber-500" />
          Institutional Real Estate Syndicate
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        </div>

        <h1 className="text-5xl font-bold leading-tight text-white sm:text-6xl">
          Connect with{" "}
          <span className="text-amber-500">World-Class</span>
          <br />
          Property Advisors
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
          The central hub for high-end fixed-price estates and trending
          global investments. Partner with vetted industry leaders who
          specialize in bespoke acquisitions, off-market penthouses, and
          prime architectural assets.
        </p>

        <div className="mt-12 w-full">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}