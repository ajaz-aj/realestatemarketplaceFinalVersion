import * as featuredCollectionService
  from "./featuredcollection.service.js";


// ==========================================
// CREATE FEATURED COLLECTION
// ==========================================

export const createFeaturedCollection =
  async (req, res) => {

    try {

      const collectionData = req.body;

      const collection =
        await featuredCollectionService
          .createFeaturedCollection(
            collectionData
          );

      res.status(201).json({
        success: true,
        message:
          "Featured collection created successfully",
        data: collection,
      });

    } catch (error) {

      console.error(
        "Create featured collection error:",
        error
      );

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  };


// ==========================================
// GET ACTIVE FEATURED COLLECTIONS
// ==========================================

export const getFeaturedCollections =
  async (req, res) => {

    try {

      const collections =
        await featuredCollectionService
          .getAllFeaturedCollections();

      res.status(200).json({
        success: true,
        data: collections,
      });

    } catch (error) {

      console.error(
        "Get featured collections error:",
        error
      );

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  };


// ==========================================
// GET ALL FEATURED COLLECTIONS
// ADMIN
// ==========================================

export const getFeaturedCollectionsAdmin =
  async (req, res) => {

    try {

      const collections =
        await featuredCollectionService
          .getAllFeaturedCollectionsAdmin();

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
// GET FEATURED COLLECTION BY ID
// ==========================================

export const getFeaturedCollection =
  async (req, res) => {

    try {

      const collection =
        await featuredCollectionService
          .getFeaturedCollectionById(
            req.params.id
          );

      if (!collection) {

        return res.status(404).json({
          success: false,
          message:
            "Featured collection not found",
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
// UPDATE FEATURED COLLECTION
// ==========================================

export const updateFeaturedCollection =
  async (req, res) => {

    try {

      const collection =
        await featuredCollectionService
          .updateFeaturedCollection(
            req.params.id,
            req.body
          );

      if (!collection) {

        return res.status(404).json({
          success: false,
          message:
            "Featured collection not found",
        });

      }

      res.status(200).json({
        success: true,
        message:
          "Featured collection updated successfully",
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
// DELETE FEATURED COLLECTION
// ==========================================

export const deleteFeaturedCollection =
  async (req, res) => {

    try {

      const collection =
        await featuredCollectionService
          .deleteFeaturedCollection(
            req.params.id
          );

      if (!collection) {

        return res.status(404).json({
          success: false,
          message:
            "Featured collection not found",
        });

      }

      res.status(200).json({
        success: true,
        message:
          "Featured collection deleted successfully",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  };