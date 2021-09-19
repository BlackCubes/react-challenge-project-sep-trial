const Validator = require("validatorjs");
const regex = require("./regex");
const { AppError } = require("../errors");
const Models = require("../models");
const { capitalize, sanitize } = require("../utils");

// Validate password
Validator.register(
  "regexPassword",
  (val) => regex.password.test(val),
  "Please use at least one number, one special character, and one capital letter between 8 to 60 characters for the password."
);

// Validate Mongo ID
Validator.register(
  "regexMongoID",
  (val) => regex.mongoID.test(val),
  "Not a valid ID"
);

// Validate if a specific field in a DB exists.
Validator.registerAsync("exist", (val, attribute, req, passes) => {
  if (!attribute) {
    throw new Error(
      "Specify requirements i.e. fieldName: exist:table, column."
    );
  }

  const attArr = attribute.split(",");
  if (attArr.length !== 2) {
    throw new Error(`Invalid format for validation rule on ${attribute}.`);
  }

  const { 0: table, 1: column } = attArr;

  const msg = `${capitalize(column)} already in use.`;

  Models[table].valueExists({ [column]: val }).then((res) => {
    if (res) {
      passes(false, msg);
      return;
    }

    passes();
  });
});

const errMsg = (errObj) => {
  let message = "";

  Object.values(errObj).forEach((err) => {
    message += `${err[0]} `;
  });

  return message.slice(0, -1);
};

const validatorFunction = (body, rules, customMessages, cb) => {
  const validation = new Validator(body, rules, customMessages);

  validation.passes(() => cb(null, true));
  validation.fails(() => cb(validation.errors, false));
};

module.exports = (req, next, validationRule) => {
  // If there are any ID in the params, extract it so it could be validated.
  if (req.params.id) {
    req.body.id = sanitize({ id: req.params.id }).id;
  }

  return validatorFunction(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return next(new AppError(`${errMsg(err.errors)}`, 400));
    }

    next();
  });
};
