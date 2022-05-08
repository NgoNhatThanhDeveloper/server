export const createCodeNumber = () => {
  const code = Math.floor(Math.random() * (1000000 - 100000)) + 100000;
  return code;
};
export const createCodePassword = () => {
  let result = " ";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result + "Hdb55";
};
