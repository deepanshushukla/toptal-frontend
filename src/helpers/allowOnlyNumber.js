export const allowOnlyNumber = (event) => {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
};
