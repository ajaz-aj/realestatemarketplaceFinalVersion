
// import bcrypt from "bcryptjs";

// import User from "../user/user.model.js";

// import generateToken from "../../utils/genarateToken.js";


// export const registerUser = async (
//   fullName,
//   email,
//   phone,
//   password
// ) => {



//   const existingUser = await User.findOne({
//     email,
//   });

//   if (existingUser) {
//     throw new Error("User already exists");
//   }



//   const hashedPassword = await bcrypt.hash(
//     password,
//     10
//   );



//   const user = await User.create({
//     fullName,
//     email,
//     phone,
//     password: hashedPassword,
//   });



//   const token = generateToken(
//     user._id,
//     user.role
//   );



//   return {
//     user: {
//       id: user._id,
//       fullName: user.fullName,
//       email: user.email,
//       phone: user.phone,
//       role: user.role,
//     },

//     token,
//   };
// };



// export const loginUser = async (
//   email,
//   password
// ) => {



//   const user = await User.findOne({
//     email,
//   });

//   if (!user) {
//     throw new Error(
//       "Invalid email or password"
//     );
//   }



//   const isPasswordCorrect =
//     await bcrypt.compare(
//       password,
//       user.password
//     );

//   if (!isPasswordCorrect) {
//     throw new Error(
//       "Invalid email or password"
//     );
//   }



//   const token = generateToken(
//     user._id,
//     user.role
//   );



//   return {
//     user: {
//       id: user._id,
//       fullName: user.fullName,
//       email: user.email,
//       phone: user.phone,
//       role: user.role,
//     },

//     token,
//   };
// };




import bcrypt from "bcryptjs";

import User from "../user/user.model.js";
import Agent from "../agent/agent.model.js";

import generateToken from "../../utils/genarateToken.js";

// ==========================================
// REGISTER USER
// ==========================================

export const registerUser = async (
  fullName,
  email,
  phone,
  password
) => {

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email,
    phone,
    password: hashedPassword,
    role: "user",
  });

  const token = generateToken(user._id, user.role);

  return {
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    token,
  };
};

// ==========================================
// REGISTER AGENT
// ==========================================

export const registerAgent = async (
  fullName,
  email,
  phone,
  password
) => {

  const existingAgent = await Agent.findOne({ email });

  if (existingAgent) {
    throw new Error("Agent already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const agent = await Agent.create({
    fullName,
    email,
    phone,
    password: hashedPassword,
    role: "agent",
  });

  const token = generateToken(agent._id, agent.role);

  return {
    user: {
      id: agent._id,
      fullName: agent.fullName,
      email: agent.email,
      phone: agent.phone,
      role: agent.role,
    },
    token,
  };
};

// ==========================================
// LOGIN USER
// ==========================================

export const loginUser = async (email, password) => {

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id, user.role);

  return {
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    token,
  };
};

// ==========================================
// LOGIN AGENT
// ==========================================

export const loginAgent = async (email, password) => {
  let agent = await Agent.findOne({ email });

  if (!agent) {
    const adminUser = await User.findOne({ email, role: "admin" });
    if (adminUser) {
      agent = adminUser;
    }
  }

  if (!agent) {
    throw new Error("Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    agent.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(agent._id, agent.role);

  return {
    user: {
      id: agent._id,
      fullName: agent.fullName,
      email: agent.email,
      phone: agent.phone,
      role: agent.role,
    },
    token,
  };
};