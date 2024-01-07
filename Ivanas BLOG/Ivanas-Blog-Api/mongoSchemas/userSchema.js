import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});
userSchema.statics.login = async function (email, password) {
  const fixedEmail = process.env.USER_EMAIL;
  const fixedPassword = process.env.USER_PASSWORD;

  if (email === fixedEmail && password === fixedPassword) {
    return { email: fixedEmail };
  }
  const existingUser = await this.findOne({ email: fixedEmail });

  if (existingUser) {
    const salt = await bcrypt.genSalt(5);
    const hash = bcrypt.hash(fixedPassword, salt);

    existingUser.password = hash;
    const updatedUser = await existingUser.save();

    return updatedUser;
  } else {
    // If no user exists, create a new user with fixed email and password
    const salt = await bcrypt.genSalt(5);
    const hash = bcrypt.hash(fixedPassword, salt);

    const user = await this.create({ email: fixedEmail, password: hash });
    return user;
  }
};

const User = mongoose.model("User", userSchema);

export default User;
