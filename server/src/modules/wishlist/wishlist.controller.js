import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  checkWishlist,
} from "./wishlist.service.js";


// ADD PROPERTY
export const addProperty = async (req, res) => {

  try {

    const wishlist = await addToWishlist(
      req.user.id,
      req.params.propertyId
    );

    res.status(201).json({
      success: true,
      message: "Property added to wishlist",
      data: wishlist,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};


// REMOVE PROPERTY
export const removeProperty = async (
  req,
  res
) => {

  try {

    const wishlist =
      await removeFromWishlist(
        req.user.id,
        req.params.propertyId
      );

    res.status(200).json({
      success: true,
      message: "Property removed from wishlist",
      data: wishlist,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};


// GET SAVED PROPERTIES
export const getSavedProperties = async (
  req,
  res
) => {

  try {

    const wishlist = await getWishlist(
      req.user.id
    );

    res.status(200).json({
      success: true,
      data: wishlist
        ? wishlist.properties
        : [],
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// CHECK PROPERTY
export const checkSavedProperty = async (
  req,
  res
) => {

  try {

    const saved = await checkWishlist(
      req.user.id,
      req.params.propertyId
    );

    res.status(200).json({
      success: true,
      saved,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};