const checkHasInputs = (inputValuesObject) => {
  const inputValuesArray = Object.values(inputValuesObject);

  if (!inputValuesObject || !inputValuesArray.length) return;

  for (let i = 0; i < inputValuesArray.length; i++) {
    if (!inputValuesArray[i]) return false;
  }

  return true;
};

export default checkHasInputs;
