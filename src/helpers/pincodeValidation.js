export const pinCodeValidator = (_, value) => {
  if (!value) {
    return Promise.reject(new Error("Pincode is required"));
  } else if (value.toString().length !== 6) {
    return Promise.reject(new Error("Pincode length should be 6 "));
  } else {
    return Promise.resolve();
  }
};
