const { User } = require("../models");
const { AppError } = require("../errors");
const { catchAsync, filterObject, sanitize } = require("../utils");

// signup expects email/password/password_confirmation
// successful signup returns a true success
exports.signup = catchAsync(async (req, res, next) => {
  const filteredBody = sanitize(
    filterObject(req.body, "email", "password", "password_confirmation")
  );

  const newUser = await User.create(filteredBody);

  // Remove password from potential output
  newUser.password = undefined;

  res.status(201).json({
    success: true,
  });
});

// login expects email/password
// successful login returns email and a fake token (if we ever want to use it)
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
