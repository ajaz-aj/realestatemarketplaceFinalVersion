import * as collectionService from "./collection.service.js";


// ==========================================
// CREATE COLLECTION
// ==========================================

export const createCollection = async (
  req,
  res
) => {
  try {

    const collectionData = req.body;

    const collection =
      await collectionService.createCollection(
        collectionData
      );

    res.status(201).json({
      success: true,
      message: "Collection created successfully",
      data: collection,
    });

  } catch (error) {

    console.error(
      "Create collection error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ==========================================
// GET ALL ACTIVE COLLECTIONS
// ==========================================

export const getCollections = async (
  req,
  res
) => {
  try {

    const collections =
      await collectionService.getAllCollections();

    res.status(200).json({
      success: true,
      data: collections,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ==========================================
// GET ALL COLLECTIONS FOR ADMIN
// ==========================================

export const getCollectionsAdmin = async (
  req,
  res
) => {
  try {

    const collections =
      await collectionService.getAllCollectionsAdmin();

    res.status(200).json({
      success: true,
      data: collections,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ==========================================
// GET COLLECTION BY ID
// ==========================================

export const getCollection = async (
  req,
  res
) => {
  try {

    const collection =
      await collectionService.getCollectionById(
        req.params.id
      );

    if (!collection) {

      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });

    }

    res.status(200).json({
      success: true,
      data: collection,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ==========================================
// GET COLLECTION BY SLUG
// ==========================================

export const getCollectionBySlug = async (
  req,
  res
) => {
  try {

    const collection =
      await collectionService.getCollectionBySlug(
        req.params.slug
      );

    if (!collection) {

      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });

    }

    res.status(200).json({
      success: true,
      data: collection,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ==========================================
// UPDATE COLLECTION
// ==========================================

export const updateCollection = async (
  req,
  res
) => {
  try {

    const collection =
      await collectionService.updateCollection(
        req.params.id,
        req.body
      );

    if (!collection) {

      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });

    }

    res.status(200).json({
      success: true,
      message: "Collection updated successfully",
      data: collection,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ==========================================
// DELETE COLLECTION
// ==========================================

export const deleteCollection = async (
  req,
  res
) => {
  try {

    const collection =
      await collectionService.deleteCollection(
        req.params.id
      );

    if (!collection) {

      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });

    }

    res.status(200).json({
      success: true,
      message: "Collection deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};