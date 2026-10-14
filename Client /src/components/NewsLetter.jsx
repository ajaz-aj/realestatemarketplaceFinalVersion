function Newsletter() {
  return (
    <section className="bg-[#0B0D12] py-2 md:py-8 px-4 sm:px-6">

      <div className="mx-auto max-w-6xl rounded-[24px] md:rounded-[40px] bg-[#1C1106] py-12 px-6 md:py-20 md:px-10">

        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
          Stay Informed On The <br className="hidden md:block" />
          Elite Market
        </h2>

        {/* Input */}
        <div className="mt-8 md:mt-12 flex justify-center">

          {/* Wrapper: Stacks on mobile, forms a single pill on sm+ screens */}
          <div className="flex w-full max-w-2xl flex-col sm:flex-row items-center sm:rounded-full bg-transparent sm:bg-white p-0 sm:p-2 gap-4 sm:gap-0">

            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full flex-1 rounded-full sm:rounded-none bg-white sm:bg-transparent px-6 py-4 sm:py-2 text-base md:text-lg text-black outline-none"
            />

            <button className="w-full sm:w-auto rounded-full bg-[#C98616] px-8 py-4 sm:py-3 md:py-4 text-base md:text-lg text-white font-semibold transition hover:bg-[#b97912]">
              Subscribe
            </button>

          </div>

        </div>

        {/* Description */}
        <p className="mx-auto mt-8 md:mt-10 max-w-2xl text-center text-sm md:text-base lg:text-lg text-gray-400">
          Subscribe to our weekly insight on global market trends and receive
          early access to upcoming luxury auctions.
        </p>

      </div>

    </section>
  );
}

export default Newsletter;