import express from "express";

import {
  createInvestmentController,
  getInvestments,
  getMyInvestmentList,
  getInvestment,
  updateInvestmentController,
  cancelInvestmentController,
  getPortfolios,
  createPortfolio,
} from "./investment.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Public portfolios route
router.get("/portfolios", getPortfolios);
router.post("/portfolios", createPortfolio);

// Protected routes

// Create investment
router.post(
  "/",
  protect,
  createInvestmentController
);

// Get logged-in user's investments
router.get(
  "/my",
  protect,
  getMyInvestmentList
);

// Get all investments
router.get(
  "/",
  protect,
  getInvestments
);

// Get one investment
router.get(
  "/:investmentId",
  protect,
  getInvestment
);

// Update investment
router.put(
  "/:investmentId",
  protect,
  updateInvestmentController
);

// Cancel investment
router.patch(
  "/:investmentId/cancel",
  protect,
  cancelInvestmentController
);

export default router;