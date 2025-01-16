import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new Schema({
  userId: { type: String, unique: true, default: uuidv4() },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
  password: { type: String, required: true },
});

export const userModel = model("user", userSchema);
