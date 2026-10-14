import User from "../user/user.model.js";

export const getAllUsers = async () => {
  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 });

  return users;
};

export const getUserById = async (userId) => {
  const user = await User.findById(userId).select(
    "-password"
  );

  return user;
};

export const updateUserByAdmin = async (
  userId,
  updateData
) => {
  const user = await User.findByIdAndUpdate(
    userId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  return user;
};

export const deleteUserByAdmin = async (userId) => {
  const user = await User.findByIdAndDelete(userId);

  return user;
};

export const changeUserRole = async (
  userId,
  role
) => {
  const allowedRoles = [
    "user",
    "admin",
    "agent",
    "investor",
  ];

  if (!allowedRoles.includes(role)) {
    throw new Error("Invalid user role");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  return user;
};