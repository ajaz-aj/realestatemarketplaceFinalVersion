import express from "express";

import {
  createFeaturedCollection,
  getFeaturedCollections,
  getFeaturedCollectionsAdmin,
  getFeaturedCollection,
  updateFeaturedCollection,
  deleteFeaturedCollection,
} from "./featuredcollection.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";
import { adminOnly } from "../../middlewares/admin.middleware.js";

const router = express.Router();


// ==========================================
// PUBLIC ROUTES
// ==========================================

// Get active featured collections
router.get(
  "/",
  getFeaturedCollections
);

// Get single featured collection
router.get(
  "/:id",
  getFeaturedCollection
);


// ==========================================
// ADMIN ROUTES
// ==========================================

// Get all collections
router.get(
  "/admin/all",
//   protect,
//   adminOnly,
  getFeaturedCollectionsAdmin
);

// Create
router.post(
  "/",
//   protect,
//   adminOnly,
  createFeaturedCollection
);

// Update
router.put(
  "/:id",
//   protect,
//   adminOnly,
  updateFeaturedCollection
);

// Delete
router.delete(
  "/:id",
//   protect,
//   adminOnly,
  deleteFeaturedCollection
);


export default router;