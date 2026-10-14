import RentPhoto from "./rentphoto.model.js";

// ==========================================
// CREATE RENT PHOTO
// ==========================================
export const createRentPhoto = async (rentPhotoData) => {
  const rentPhoto = await RentPhoto.create(rentPhotoData);
  return rentPhoto;
};

// ==========================================
// GET ALL ACTIVE RENT PHOTOS (public)
// ==========================================
export const getAllRentPhotos = async () => {
  const rentPhotos = await RentPhoto.find({ isActive: true }).sort({
    displayOrder: 1,
  });

  return rentPhotos;
};

// ==========================================
// GET ALL RENT PHOTOS (admin)
// ==========================================
export const getAllRentPhotosAdmin = async () => {
  const rentPhotos = await RentPhoto.find().sort({ displayOrder: 1 });
  return rentPhotos;
};

// ==========================================
// GET RENT PHOTO BY ID
// ==========================================
export const getRentPhotoById = async (id) => {
  const rentPhoto = await RentPhoto.findById(id);
  return rentPhoto;
};

// ==========================================
// UPDATE RENT PHOTO
// ==========================================
export const updateRentPhoto = async (id, rentPhotoData) => {
  const rentPhoto = await RentPhoto.findByIdAndUpdate(id, rentPhotoData, {
    new: true,
    runValidators: true,
  });

  return rentPhoto;
};

// ==========================================
// DELETE RENT PHOTO
// ==========================================
export const deleteRentPhoto = async (id) => {
  const rentPhoto = await RentPhoto.findByIdAndDelete(id);
  return rentPhoto;
};