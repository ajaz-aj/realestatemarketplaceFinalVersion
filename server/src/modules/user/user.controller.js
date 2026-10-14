import {
  getUserById,
  updateUser,
  deleteUser,
} from "./user.service.js";


// GET PROFILE
export const getProfile = async (req, res) => {

  try {

    const user = await getUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// UPDATE PROFILE
export const updateProfile = async (req, res) => {

  try {

    const user = await updateUser(
      req.user.id,
      req.body
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// DELETE ACCOUNT
export const deleteAccount = async (req, res) => {

  try {

    const user = await deleteUser(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};