import jwt from "jsonwebtoken";
import User from "../mongoSchemas/userSchema.js";

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };
  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered";
  }
  if (err.message === "incorrect password") {
    errors.password = "that password is not incorrect";
  }
  // duplicate err coed
  if (err.code == "11000") {
    errors.email = "this email already exists";
  }
  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3000000d" });
};

class AuthController {
  async login_post(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);

      res.status(200).json({ email, token });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  }
}
export default AuthController;
