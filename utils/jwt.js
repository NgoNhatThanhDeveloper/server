import jwt from "jsonwebtoken";
import Promise from "bluebird";
export const generateAccessJWT = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });
};
export const generateRefreshJWT = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
};
export const verifyToken = (token, isExp, secretKey) => {
  return new Promise((resolve, reject) => {
    try {
      const payload = jwt.verify(token, secretKey, {
        ignoreExpiration: isExp,
      });
      resolve(payload);
    } catch (err) {
      reject(new Error("Mã phiên xác thực đã hết hạn hoặc không hợp lệ"));
    }
  });
};
