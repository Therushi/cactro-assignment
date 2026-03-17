const UserModel = require("../models/user.model");

exports.createUser = async (req, res, next) => {
  try {
    const { email, password, userType, name, contactNo, age } = req.body;
    const userInfo = await UserModel.findOne({
      email,
    });
    if (userInfo) {
      return next({
        message: "User already exists",
        statusCode: 409,
      });
    }

    const user = await UserModel.create({
      email,
      password,
      userType,
      name,
      contactNo,
      age,
    });

    res.status(201).json({
      message: "UserModel created successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json({
      message: "Users fetched sucessfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
