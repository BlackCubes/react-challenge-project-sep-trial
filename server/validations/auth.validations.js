const validatorHandler = require("./validatorHandler");
const { catchAsync } = require("../utils");

exports.signup = catchAsync(async (req, res, next) => {
  const validationRule = {
    email: "required|email|exist:User,email",
    password: "required|string|min:8|max:60|confirmed|regexPassword",
    password_confirmation: "required|string",
  };

  validatorHandler(req, next, validationRule);
});

exports.login = catchAsync(async (req, res, next) => {
  const validationRule = {
    email: "required|email",
    password: "required|string|min:8|max:60|regexPassword",
  };

  validatorHandler(req, next, validationRule);
});
