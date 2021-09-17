const { User } = require("../models");
const { AppError } = require("../errors");
const { catchAsync, filterObject, sanitize } = require("../utils");

// login expects email/password
// successful login returns email and a fake token (if we
// evet want to use it)
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = sanitize(
    filterObject(req.body, "email", "password")
  );

  if (!email || !password) {
    return next(new AppError("Please provide an email and password!", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password!", 401));
  }

  // Remove password from potential output
  user.password = undefined;

  res.status(200).json({
    success: true,
    email,
    token: "12345phpIsAwesome",
  });
});
