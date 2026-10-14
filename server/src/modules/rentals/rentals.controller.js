import {
  createRental,
  getAllRentals,
  getRentalById,
  updateRental,
  deleteRental,
} from "./rentals.service.js";

export const createRentalController = async (req, res) => {
  try {
    const rental = await createRental(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Rental created successfully",
      data: rental,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRentals = async (req, res) => {
  try {
    const rentals = await getAllRentals();

    res.status(200).json({
      success: true,
      data: rentals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRental = async (req, res) => {
  try {
    const rental = await getRentalById(
      req.params.rentalId
    );

    if (!rental) {
      return res.status(404).json({
        success: false,
        message: "Rental not found",
      });
    }

    res.status(200).json({
      success: true,
      data: rental,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateRentalController = async (req, res) => {
  try {
    const rental = await updateRental(
      req.params.rentalId,
      req.user.id,
      req.body
    );

    if (!rental) {
      return res.status(404).json({
        success: false,
        message: "Rental not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Rental updated successfully",
      data: rental,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteRentalController = async (req, res) => {
  try {
    const rental = await deleteRental(
      req.params.rentalId,
      req.user.id
    );

    if (!rental) {
      return res.status(404).json({
        success: false,
        message: "Rental not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Rental deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};