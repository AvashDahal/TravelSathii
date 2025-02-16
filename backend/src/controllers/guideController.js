import User from "../models/guideModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, 'jyoti', {
    expiresIn: "1h", // Adjust token expiration as needed
  });
};

const signupUser = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const token = generateToken(newUser._id);

    // Set token in HTTP-only cookie
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true, // Enable in production with HTTPS
      sameSite: "None", // Enable for cross-site cookies
    }).status(200).json({
      message: "User created successfully",
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      accessToken: token, // Send token in response for frontend storage (optional)
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true, // Enable in production with HTTPS
      sameSite: "None", // Enable for cross-site cookies
    });

    res.status(200).json({
      message: "Login successful",
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      accessToken: token, // Send token in response for frontend storage (optional)
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    // Clear HTTP-only cookie
    res.clearCookie("accessToken", { path: "/" });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export { signupUser, loginUser, logoutUser };
