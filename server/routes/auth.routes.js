const express = require("express");
const { authController } = require("../controllers");
const { authValidation } = require("../validations");

const router = express.Router();

router.post("/login", authValidation.login, authController.login);

module.exports = router;
