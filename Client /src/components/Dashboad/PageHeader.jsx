function PageHeader({ topLabel, title, description }) {
  return (
    <div className="flex flex-col gap-2 pb-6">

      {topLabel && (
        <p className="text-xs font-bold tracking-[3px] uppercase"
          style={{ color: "#C88A1A" }}>
          {topLabel}
        </p>
      )}

      <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
        {title}
      </h1>

      <p className="text-gray-400 text-base mt-1">
        {description}
      </p>

    </div>
  );
}

export default PageHeader;