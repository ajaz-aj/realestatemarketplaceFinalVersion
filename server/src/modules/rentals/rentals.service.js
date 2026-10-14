import Rental from "./rentals.model.js";
import Property from "../property/property.model.js";

export const createRental = async (userId, rentalData) => {
  const property = await Property.findById(rentalData.property);

  if (!property) {
    throw new Error("Property not found");
  }

  const rental = await Rental.create({
    ...rentalData,
    landlord: userId,
  });

  return rental;
};

export const getAllRentals = async () => {
  const rentals = await Rental.find()
    .populate("property")
    .populate("landlord", "fullName email phone");

  return rentals;
};

export const getRentalById = async (rentalId) => {
  const rental = await Rental.findById(rentalId)
    .populate("property")
    .populate("landlord", "fullName email phone");

  return rental;
};

export const updateRental = async (rentalId, userId, updateData) => {
  const rental = await Rental.findOne({
    _id: rentalId,
    landlord: userId,
  });

  if (!rental) {
    throw new Error("Rental not found or you are not the owner");
  }

  Object.assign(rental, updateData);

  await rental.save();

  return rental;
};

export const deleteRental = async (rentalId, userId) => {
  const rental = await Rental.findOneAndDelete({
    _id: rentalId,
    landlord: userId,
  });

  return rental;
};