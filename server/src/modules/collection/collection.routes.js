import express from "express";

import {
  createCollection,
  getCollections,
  getCollectionsAdmin,
  getCollection,
  getCollectionBySlug,
  updateCollection,
  deleteCollection,
} from "./collection.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";
import { adminOnly } from "../../middlewares/admin.middleware.js";

const router = express.Router();


// ==========================================
// PUBLIC ROUTES
// ==========================================

// Get active collections
router.get(
  "/",
  getCollections
);

// Get collection by slug
router.get(
  "/slug/:slug",
  getCollectionBySlug
);

// Get collection by ID
router.get(
  "/:id",
  getCollection
);


// ==========================================
// ADMIN ROUTES
// ==========================================

// Get all collections including inactive
router.get(
  "/admin/all",
//   protect,
//   adminOnly,
  getCollectionsAdmin
);

// Create collection
router.post(
  "/",
//   protect,
//   adminOnly,
  createCollection
);

// Update collection
router.put(
  "/:id",
//   protect,
//   adminOnly,
  updateCollection
);

// Delete collection
router.delete(
  "/:id",
//   protect,
//   adminOnly,
  deleteCollection
);


export default router;