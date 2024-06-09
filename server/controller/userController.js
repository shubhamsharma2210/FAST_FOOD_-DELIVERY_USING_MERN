import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SCECRET);
  };

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exists" });
    }

    const isMatchedPassword = await bcrypt.compare(password, user.password);
    if (!isMatchedPassword) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
// register user



const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // checking is user allready exist
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User allready exists" });
    }
    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "please enter valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter storng password",
      });
    }

    // hasing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

export { loginUser, registerUser };
