import express from "express";

import {
  addProperty,
  removeProperty,
  getSavedProperties,
  checkSavedProperty,
} from "./wishlist.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();


// GET ALL SAVED PROPERTIES
router.get(
  "/",
  protect,
  getSavedProperties
);


// ADD PROPERTY
router.post(
  "/:propertyId",
  protect,
  addProperty
);


// REMOVE PROPERTY
router.delete(
  "/:propertyId",
  protect,
  removeProperty
);


// CHECK PROPERTY
router.get(
  "/check/:propertyId",
  protect,
  checkSavedProperty
);


export default router;