import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import { validateEmail } from "../../../utils/email.utils.js";
import { hashPassword } from "../../../utils/password.utils.js";

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
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
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "cart",
  },
});

//Plugin de paginación
userSchema.plugin(mongoosePaginate);

userSchema.pre("save", async function (next) {
  const user = this;

  // Validate email
  const isValidEmail = await validateEmail(user.email);

  if (!isValidEmail) return next(new Error("Invalid email"));

  next();
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  // Hash the password
  const hashedPassword = await hashPassword(user.password);
  user.password = hashedPassword;

  next();
});

export const userModel = model("user", userSchema);