import Wishlist from "./wishlist.model.js";
import Property from "../property/property.model.js";


// ADD PROPERTY
export const addToWishlist = async (
  userId,
  propertyId
) => {

  const property = await Property.findById(
    propertyId
  );

  if (!property) {
    throw new Error("Property not found");
  }

  let wishlist = await Wishlist.findOne({
    user: userId,
  });

  if (!wishlist) {

    wishlist = await Wishlist.create({
      user: userId,
      properties: [propertyId],
    });

    return wishlist;
  }

  const alreadySaved = wishlist.properties.some(
    (id) =>
      id.toString() === propertyId.toString()
  );

  if (alreadySaved) {
    throw new Error("Property already saved");
  }

  wishlist.properties.push(propertyId);

  await wishlist.save();

  return wishlist;
};


// REMOVE PROPERTY
export const removeFromWishlist = async (
  userId,
  propertyId
) => {

  const wishlist = await Wishlist.findOne({
    user: userId,
  });

  if (!wishlist) {
    throw new Error("Wishlist not found");
  }

  wishlist.properties =
    wishlist.properties.filter(
      (id) =>
        id.toString() !== propertyId.toString()
    );

  await wishlist.save();

  return wishlist;
};


// GET WISHLIST
export const getWishlist = async (userId) => {

  const wishlist = await Wishlist.findOne({
    user: userId,
  }).populate("properties");

  return wishlist;
};


// CHECK PROPERTY
export const checkWishlist = async (
  userId,
  propertyId
) => {

  const wishlist = await Wishlist.findOne({
    user: userId,
  });

  if (!wishlist) {
    return false;
  }

  const exists = wishlist.properties.some(
    (id) =>
      id.toString() === propertyId.toString()
  );

  return exists;
};