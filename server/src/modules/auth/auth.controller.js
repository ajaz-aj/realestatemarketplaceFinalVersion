
// import {
//   registerUser,
//   loginUser,
// } from "./auth.service.js";


// export const register = async (req, res) => {
//   try {

//     const {
//       fullName,
//       email,
//       phone,
//       password,
//     } = req.body;

//     const result = await registerUser(
//       fullName,
//       email,
//       phone,
//       password
//     );

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       data: result,
//     });

//   } catch (error) {

//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });

//   }
// };


// export const login = async (req, res) => {
//   try {

//     const {
//       email,
//       password,
//     } = req.body;

//     const result = await loginUser(
//       email,
//       password
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       data: result,
//     });

//   } catch (error) {

//     res.status(401).json({
//       success: false,
//       message: error.message,
//     });

//   }
// };



import {
  registerUser,
  registerAgent,
  loginUser,
  loginAgent,
} from "./auth.service.js";

// ==========================================
// REGISTER
// ==========================================

export const register = async (req, res) => {
  try {
    const { fullName, email, phone, password, role } = req.body;

    // ==========================================
    // ROUTE TO CORRECT REGISTER FUNCTION
    // ==========================================

    const result =
      role === "agent"
        ? await registerAgent(fullName, email, phone, password)
        : await registerUser(fullName, email, phone, password);

    res.status(201).json({
      success: true,
      message:
        role === "agent"
          ? "Agent registered successfully"
          : "User registered successfully",
      data: result,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// LOGIN
// ==========================================

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // ==========================================
    // ROUTE TO CORRECT LOGIN FUNCTION
    // ==========================================

    const result =
      role === "agent"
        ? await loginAgent(email, password)
        : await loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
