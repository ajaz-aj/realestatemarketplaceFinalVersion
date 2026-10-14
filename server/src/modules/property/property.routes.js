import express from "express";

import {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty,
} from "./property.controller.js";

import { protect, requireAgent } from "../../middlewares/auth.middleware.js";

import upload from "../../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/", getProperties);

router.get("/:id", getProperty);

router.post(
  "/",
  protect,
  requireAgent,
  upload.array("images", 5),
  createProperty
);

router.put(
  "/:id",
  protect,
  requireAgent,
  updateProperty
);

router.delete(
  "/:id",
  protect,
  requireAgent,
  deleteProperty
);

export default router;