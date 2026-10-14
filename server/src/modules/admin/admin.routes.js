import express from "express";

import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateUserRole,
} from "./admin.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";
import { adminOnly } from "../../middlewares/admin.middleware.js";

const router = express.Router();

router.use(protect, adminOnly);

// Get all users
router.get("/users", getUsers);

// Get one user
router.get("/users/:userId", getUser);

// Update user
router.put("/users/:userId", updateUser);

// Delete user
router.delete("/users/:userId", deleteUser);

// Change user role
router.patch(
  "/users/:userId/role",
  updateUserRole
);

export default router;