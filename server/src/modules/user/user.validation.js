export const validateUpdateUser = (req, res, next) => {
  const { fullName, phone } = req.body;

  if (fullName !== undefined && fullName.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Full name cannot be empty",
    });
  }

  if (phone !== undefined && phone.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Phone cannot be empty",
    });
  }

  next();
};