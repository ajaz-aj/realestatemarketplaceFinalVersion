import express from "express";
import {
  getProfile,
  updateProfile,
  deleteAccount,
} from "./user.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { validateUpdateUser } from "./user.validation.js";


const router = express.Router();



router.get(
  "/profile",
  protect,
  getProfile
);



router.put(
  "/profile",
  protect,
  validateUpdateUser,
  updateProfile
);



router.delete(
  "/profile",
  protect,
  deleteAccount
);


export default router;