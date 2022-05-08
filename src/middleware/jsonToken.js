import *as jwt from "../../utils/jwt.js";
export const mAccessToken = (req, res, next) => {
  jwt
    .verifyToken(
      req.headers.access_token,
      false,
      process.env.ACCESS_TOKEN_SECRET
    )
    .then((payload) => {
      req.body.payload = {
        code: payload.code,
        permission: payload.permission,
        shop: payload.shop,
      };

      next();
    })
    .catch((err) => {
      return res.status(403).json({ result: err.message });
    });
};
export const mAccessTokenExp = (req, res, next) => {
  jwt
    .verifyToken(
      req.headers.access_token,
      true,
      process.env.ACCESS_TOKEN_SECRET
    )
    .then((payload) => {
      req.body.payload = {
        code: payload.code,
        permission: payload.permission,
        shop: payload.shop,
      };
      next();
    })
    .catch((err) => {
      return res.status(403).json({ result: err.message });
    });
};
export const mRefreshToken = (req, res, next) => {
  jwt
    .verifyToken(
      req.headers.refresh_token,
      false,
      process.env.REFRESH_TOKEN_SECRET
    )
    .then((payload) => {
      if (payload.code == req.body.payload.code) {
        next();
      } else {
        return res
          .status(403)
          .json({ result: "Mã phiên xác thực đã hết hạn hoặc không hợp lệ" });
      }
    })
    .catch((err) => {
      return res.status(403).json({ result: err.message });
    });
};
