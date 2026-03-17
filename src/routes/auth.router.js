const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/signIn", authController.registerUser);
router.post("/login", authController.login);

module.exports = router;
