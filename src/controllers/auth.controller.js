require("dotenv").config();
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isUserExists = await UserModel.findOne({ email });
    if (isUserExists) {
      next({
        message: "User already exists",
        statusCode: 400,
      });
    }
    // encrypt password here before saving directly
    const user = await UserModel.create({
      email,
      password,
    });
    return res.status(201).json({
      message: "UserModel Register sucessfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExists = await UserModel.findOne({ email });
    if (!userExists) {
      next({
        message: "User does not exists",
        statusCode: 400,
      });
    }
    // check if password is correct use brcrypt logic here
    if (userExists.password !== password) {
      next({
        message: "email or password is missmatched",
        statusCode: 400,
      });
    }

    // generate accessToken
    const accessToken = jwt.sign(
      {
        id: userExists._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    return res.status(200).json({
      message: "User loggedIn",
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
