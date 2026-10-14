function ViewMapItem({ Icon, title }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/10">
        <Icon className="text-blue-500" size={22} />
      </div>

      <p className="text-xl text-gray-300">
        {title}
      </p>
    </div>
  );
}

export default ViewMapItem;