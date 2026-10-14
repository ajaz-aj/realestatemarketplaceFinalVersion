import express from "express";

import {
  createRentalController,
  getRentals,
  getRental,
  updateRentalController,
  deleteRentalController,
} from "./rentals.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getRentals);
router.get("/:rentalId", getRental);

// Protected routes
router.post("/", protect, createRentalController);
router.put("/:rentalId", protect, updateRentalController);
router.delete("/:rentalId", protect, deleteRentalController);

export default router;