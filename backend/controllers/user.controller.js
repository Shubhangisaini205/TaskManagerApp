const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const { successResponse, errorResponse } = require("../utils/helpers");

const registerUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !email || !password) {
    return errorResponse(res, "All fields are required", null, 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return errorResponse(res, "Invalid email format", null, 400);
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return errorResponse(res, "User already exists", null, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return successResponse(
      res,
      "Account created successfully!",
      {
        first_name: newUser.first_name,
        last_name: newUser?.last_name,
        email: newUser.email,
      },
      201
    );
  } catch (error) {
    console.error("Error in registerUser:", error);
    return errorResponse(
      res,
      "Server Error: Could not register user",
      error,
      500
    );
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return errorResponse(res, "Email is required", null, 400);
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return errorResponse(res, "User not found", null, 404);
    }

    if (!user.password) {
      return res.status(200).json({ redirectTo: "http://localhost:8000/auth/google" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, "Invalid credentials", null, 400);
    }
    const token = jwt.sign(
      { userId: user._id, username: user.first_name },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return successResponse(res, "Login successful!", {
      token,
      username: user.first_name,
      email: user.email,
      last_name: user?.last_name,
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    return errorResponse(res, "Server Error: Could not login", error, 500);
  }
};

module.exports = { registerUser, loginUser };
