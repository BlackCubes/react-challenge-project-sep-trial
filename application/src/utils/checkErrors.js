const checkErrors = (errorObject) => {
  const errorArray = Object.values(errorObject);

  if (!errorObject || !errorArray.length) return;

  errorArray.forEach((error) => {
    if (error.length) {
      return false;
    }
  });

  return true;
};

export default checkErrors;
