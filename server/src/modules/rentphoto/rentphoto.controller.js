import * as rentPhotoService from "./rentphoto.service.js";

// ==========================================
// CREATE RENT PHOTO
// ==========================================
export const createRentPhoto = async (req, res) => {
  try {
    const rentPhotoData = req.body;

    const rentPhoto = await rentPhotoService.createRentPhoto(rentPhotoData);

    res.status(201).json({
      success: true,
      message: "Rent photo created successfully",
      data: rentPhoto,
    });
  } catch (error) {
    console.error("Create rent photo error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET ACTIVE RENT PHOTOS
// ==========================================
export const getRentPhotos = async (req, res) => {
  try {
    const rentPhotos = await rentPhotoService.getAllRentPhotos();

    res.status(200).json({
      success: true,
      data: rentPhotos,
    });
  } catch (error) {
    console.error("Get rent photos error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET ALL RENT PHOTOS — ADMIN
// ==========================================
export const getRentPhotosAdmin = async (req, res) => {
  try {
    const rentPhotos = await rentPhotoService.getAllRentPhotosAdmin();

    res.status(200).json({
      success: true,
      data: rentPhotos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET RENT PHOTO BY ID
// ==========================================
export const getRentPhoto = async (req, res) => {
  try {
    const rentPhoto = await rentPhotoService.getRentPhotoById(req.params.id);

    if (!rentPhoto) {
      return res.status(404).json({
        success: false,
        message: "Rent photo not found",
      });
    }

    res.status(200).json({
      success: true,
      data: rentPhoto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE RENT PHOTO
// ==========================================
export const updateRentPhoto = async (req, res) => {
  try {
    const rentPhoto = await rentPhotoService.updateRentPhoto(
      req.params.id,
      req.body
    );

    if (!rentPhoto) {
      return res.status(404).json({
        success: false,
        message: "Rent photo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Rent photo updated successfully",
      data: rentPhoto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE RENT PHOTO
// ==========================================
export const deleteRentPhoto = async (req, res) => {
  try {
    const rentPhoto = await rentPhotoService.deleteRentPhoto(req.params.id);

    if (!rentPhoto) {
      return res.status(404).json({
        success: false,
        message: "Rent photo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Rent photo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};