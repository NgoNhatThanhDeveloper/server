export const validateString = (input) => {
  const vnp_regex = /([a-zA-Z0-9]{1,100})\b/g;
  return vnp_regex.test(input);
};
export const validatePhone = (input) => {
  const vnp_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  return vnp_regex.test(input);
};
export const validateCardNumber = (input) => {
  const vnp_regex = /([0-9]{12})\b/g;
  return vnp_regex.test(input);
};
export const validatePassword = (input) => {
  const vnp_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,50}$/;
  return vnp_regex.test(input);
};
export const validateEmail = (input) => {
  const vnp_regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return vnp_regex.test(input);
};
