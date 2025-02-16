import mongoose from "mongoose";
 const guideSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["guide", "tourist"],
      default: "guide", // Default role is 'guide'
    },

     });
const User = mongoose.model("User", guideSchema);
export default User;