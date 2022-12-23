const User = require("../modal/user.modal");
const { response } = require("./helper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    let existingUser = await User.find({ email: req.body.email });

    if (existingUser.length > 0) {
      return res.status(500).json({
        ...response,
        global_error: "User Already Exists",
      });
    }
    const salt = bcrypt.genSaltSync(+process.env.SALTROUNDS);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      password: hash,
      email: req.body.email,
    });

    const saveUser = await newUser.save();

    if (saveUser) {
      return res.status(200).json({
        ...response,
        data: saveUser,
        message: "User Created Successfully",
      });
    }
  } catch (error) {
    return res.status(400).json({
      ...response,
      global_error: "Problem while creating user",
    });
  }
};

const login = async (req, res) => {
  try {
    let existingUser = await User.find({ email: req.body.email });

    const passwordMatch = bcrypt.compareSync(
      req.body.password,
      existingUser[0].password
    );

    if (!passwordMatch) {
      return res.status(500).json({
        ...response,
        global_error: "Username or Password is wrong",
      });
    }

    let token = await jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.SECRETE_KEY,
      { expiresIn: "1h" }
    );

    if (existingUser.length > 0) {
      return res.status(200).json({
        ...response,
        data: existingUser,
        message: "User logged in Successfully",
        token,
      });
    }
  } catch (error) {
    return res.status(400).json({
      ...response,
      global_error: "Problem while login",
    });
  }
};

module.exports = { createUser, login };
