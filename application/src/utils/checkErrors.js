const checkErrors = (errorObject) => {
  const errorArray = Object.values(errorObject);

  if (!errorObject || !errorArray.length) return;

  for (let i = 0; i < errorArray.length; i++) {
    if (errorArray[i].length) return false;
  }

  return true;
};

export default checkErrors;
