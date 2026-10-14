import express from "express";

import {
  createAuctionController,
  getAuctions,
  getAuction,
  updateAuctionController,
  deleteAuctionController,
} from "./auction.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getAuctions);

router.get("/:auctionId", getAuction);

// Protected routes
router.post("/", protect, createAuctionController);

router.put(
  "/:auctionId",
  protect,
  updateAuctionController
);

router.delete(
  "/:auctionId",
  protect,
  deleteAuctionController
);

export default router;