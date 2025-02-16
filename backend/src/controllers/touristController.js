import Tourist from "../models/touristModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, 'jyoti', {
    expiresIn: "1h", // Adjust token expiration as needed
  });
};

const signupUser = async (req, res) => {
  console.log(req.body);

  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Tourist.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new Tourist({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const token = generateToken(newUser._id);

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    }).status(200).json({
      message: "Tourist account created successfully",
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
      token: token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Tourist.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(user._id);

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({
      message: "Tourist Login successful",
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("accessToken", { path: "/" });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const getUserNameById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Tourist.findById(userId, 'fullName');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ fullName: user.fullName });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export { signupUser, loginUser, logoutUser, getUserNameById };
