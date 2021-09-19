const validationHandler = require("./validatorHandler");
const { catchAsync } = require("../utils");

exports.addOrder = catchAsync(async (req, res, next) => {
  const validationRule = {
    order_item: "required|string",
    quantity: "required|numeric",
    ordered_by: "required|string",
  };

  validationHandler(req, next, validationRule);
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const validationRule = {
    id: "required|hex|size:24",
    order_item: "string",
    quantity: "numeric",
    ordered_by: "string",
  };

  validationHandler(req, next, validationRule);
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const validationRule = {
    id: "required|hex|size:24",
  };

  validationHandler(req, next, validationRule);
});
