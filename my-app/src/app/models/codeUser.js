import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },mobile:{
         type: String,
      required: true,
      unique: true,
    }
,
    password: {
      type: String,
      default: null,
    },

    refreshToken: {
      type: String,
      default: "",
    },
 
  },


);

export default mongoose.models.codeUser || mongoose.model("codeUser", userSchema);
