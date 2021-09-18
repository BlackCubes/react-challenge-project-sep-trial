import * as regex from "./regex";

const validatorHandler = (inputValuesObject) => {
  const inputKeysArray = Object.keys(inputValuesObject);

  if (!inputValuesObject || !inputKeysArray.length) return;

  let inputErrorsObject = {};

  inputKeysArray.forEach((inputKey) => {
    switch (inputKey) {
      case "email":
        if (!inputValuesObject[inputKey].length) {
          inputErrorsObject = {
            ...inputErrorsObject,
            [inputKey]: "Required.",
          };
        } else if (!regex.email.test(inputValuesObject[inputKey])) {
          inputErrorsObject = {
            ...inputErrorsObject,
            [inputKey]: "Please provide a valid email.",
          };
        } else {
          inputErrorsObject = {
            ...inputErrorsObject,
            [inputKey]: "",
          };
        }

        break;
      case "password":
        if (!inputValuesObject[inputKey].length) {
          inputErrorsObject = {
            ...inputErrorsObject,
            [inputKey]: "Required.",
          };
        } else if (inputValuesObject[inputKey].length < 8) {
          inputErrorsObject = {
            ...inputErrorsObject,
            [inputKey]: "Must be 8 characters.",
          };
        } else if (inputValuesObject[inputKey].length > 60) {
          inputErrorsObject = {
            ...inputErrorsObject,
            [inputKey]: "Must be no greater than 60 characters.",
          };
        } else if (!regex.password.test(inputValuesObject[inputKey])) {
          inputErrorsObject = {
            ...inputErrorsObject,
            [inputKey]:
              "Please use at least one number, one special character, and one capital letter between 8 to 60 characters.",
          };
        } else {
          inputErrorsObject = {
            ...inputErrorsObject,
            [inputKey]: "",
          };
        }

        break;
      case "password_confirmation":
        if (!inputValuesObject[inputKey].length) {
          inputErrorsObject = {
            ...inputErrorsObject,
            [inputKey]: "Required.",
          };
        } else if (
          inputValuesObject.password &&
          inputValuesObject[inputKey] !== inputValuesObject.password
        ) {
          inputErrorsObject = {
            ...inputErrorsObject,
            [inputKey]: "Passwords do not match.",
          };
        } else {
          inputErrorsObject = {
            ...inputErrorsObject,
            [inputKey]: "",
          };
        }

        break;
      default:
        break;
    }
  });

  return inputErrorsObject;
};

export default validatorHandler;
