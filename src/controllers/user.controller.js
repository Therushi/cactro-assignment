const User = require("../models/user.model");

exports.createUser = async (req, res, next) => {
  try {
    const { email, password, userType, name, contactNo, age } = req.body;
    const userInfo = await User.findOne({
      email,
    });
    if (userInfo) {
      return next({
        message: "User already exists",
        statusCode: 409,
      });
    }

    const user = await User.create({
      email,
      password,
      userType,
      name,
      contactNo,
      age,
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      message: "Users fetched sucessfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
