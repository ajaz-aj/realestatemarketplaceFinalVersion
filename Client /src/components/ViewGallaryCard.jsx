function ViewGalleryCard({ image }) {
  return (
    <div className="group overflow-hidden rounded-3xl">
      <img
        src={image}
        alt=""
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
      />
    </div>
  );
}

export default ViewGalleryCard;