const validatorHandler = require("./validatorHandler");
const { catchAsync } = require("../utils");

exports.login = catchAsync(async (req, res, next) => {
  const validationRule = {
    email: "required|email",
    password: "required|string|min:8|max:60|regexPassword",
  };

  validatorHandler(req, next, validationRule);
});
