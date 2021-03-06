import * as repository from "../repository/authentication.js";
export const loginService = (req, res) => {
  const request = {
    query: { account: req.body.account, password: req.body.password },
  };
  repository
    .login(request)
    .then((response) => {
      return res.json({
        success: true,
        result: "Yêu cầu thành công",
        data: response,
      });
    })
    .catch((error) => {
      return res.json({ success: false, result: error.message });
    });
};
export const logoutService = (req, res) => {
  const request = {
    _id: req.body.payload.code,
  };
  repository
    .logout(request)
    .then(() => {
      return res
        
        .json({ success: true, result: "Yêu cầu thành công" });
    })
    .catch((error) => {
      return res.json({ success: false, result: error.message });
    });
};
import { generateAccessJWT } from "../../utils/jwt.js";
export const tokenService = (req, res) => {
  const request = {
    _id: req.body.payload.code,
    refreshToken: req.headers.refresh_token,
  };
  repository
    .token(request)
    .then(() => {
      const accessToken = generateAccessJWT(req.body.payload);
      return res
        
        .json({
          success: true,
          result: "Yêu cầu thành công",
          data: accessToken,
        });
    })
    .catch((error) => {
      return res.json({ success: false, result: error.message });
    });
};
export const changeService = (req, res) => {
  const request = {
    query: { _id: req.body.payload.code },
    password: req.body.password,
    password_replace: req.body.password_replace,
  };
  repository
    .change(request)
    .then(() => {
      return res
        
        .json({ success: true, result: "Yêu cầu thành công" });
    })
    .catch((error) => {
      return res.json({ success: false, result: error.message });
    });
};
import { sendEmail } from "../../utils/sendEmail.js";
export const missingService = (req, res) => {
  const request = {
    account: req.body.account,
    email: req.body.email,
  };
  repository
    .missing(request)
    .then((response) => {
      return sendEmail(
        response.email,
        `Mã xác thực của bạn là : ${response.code},cố tác dụng đến ${new Date(
          response.time
        )}`
      );
    })
    .then(() => {
      return res
        
        .json({
          success: true,
          result: "Thành công, kiểm tra mã xác thực trong email của bạn",
        });
    })
    .catch((error) => {
      return res.json({ success: false, result: error.message });
    });
};
export const confirmService = (req, res) => {
  const request = {
    account: req.body.account,
    code: req.body.value,
  };
  repository
    .confirm(request)
    .then((response) => {
      return sendEmail(
        response.email,
        `Mật khẩu mới của bạn là : ${response.password},`
      );
    })
    .then(() => {
      return res
        
        .json({
          success: true,
          result: "Thành công, kiểm tra mật khẩu mới trong email của bạn",
        });
    })
    .catch((error) => {
      return res.json({ success: false, result: error.message });
    });
};
