import express from "express";

import {
  createRentPhoto,
  getRentPhotos,
  getRentPhotosAdmin,
  getRentPhoto,
  updateRentPhoto,
  deleteRentPhoto,
} from "./rentphoto.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";
import { adminOnly } from "../../middlewares/admin.middleware.js";

const router = express.Router();

// ==========================================
// ADMIN - GET ALL
// ==========================================
router.get("/admin/all", getRentPhotosAdmin);

// ==========================================
// PUBLIC - GET ACTIVE
// ==========================================
router.get("/", getRentPhotos);

// ==========================================
// PUBLIC - GET ONE
// ==========================================
router.get("/:id", getRentPhoto);

// ==========================================
// ADMIN - CREATE
// ==========================================
router.post("/", createRentPhoto);

// ==========================================
// ADMIN - UPDATE
// ==========================================
router.put("/:id", updateRentPhoto);

// ==========================================
// ADMIN - DELETE
// ==========================================
router.delete("/:id", deleteRentPhoto);

export default router;