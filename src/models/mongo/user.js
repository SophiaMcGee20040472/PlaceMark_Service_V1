import Mongoose from "mongoose";

const { Schema } = Mongoose;

const userSchema = new Schema({
  // created admin key as a boolean to tell the difference between a regular user and admin. By using the true or false factors.
  admin: Boolean,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

export const User = Mongoose.model("User", userSchema);
