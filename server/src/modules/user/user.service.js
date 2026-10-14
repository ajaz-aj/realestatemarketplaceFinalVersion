import User from "./user.model.js";
import Agent from "../agent/agent.model.js";

// GET USER (or Agent)
export const getUserById = async (userId) => {
  let user = await User.findById(userId).select("-password");
  if (!user) {
    user = await Agent.findById(userId).select("-password");
  }
  return user;
};

// UPDATE USER (or Agent)
export const updateUser = async (userId, updateData) => {
  let user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) {
    user = await Agent.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");
  }

  return user;
};

// DELETE USER (or Agent)
export const deleteUser = async (userId) => {
  let user = await User.findByIdAndDelete(userId);
  if (!user) {
    user = await Agent.findByIdAndDelete(userId);
  }
  return user;
};