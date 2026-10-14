import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const token =
      authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const requireAgent = (req, res, next) => {
  if (!req.user || (req.user.role !== "agent" && req.user.role !== "admin")) {
    return res.status(403).json({
      success: false,
      message: "Access restricted: Only authorized admins or agents can add or list properties.",
    });
  }
  next();
};