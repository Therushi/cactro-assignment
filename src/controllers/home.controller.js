exports.getHome = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Home controller works perfectly!",
    });
  } catch (error) {
    next(error);
  }
};
