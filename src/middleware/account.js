import * as validate from "../../validate/validate.js";
export const mReplaceEmail = (req, res, next) => {
  if (validate.validateEmail(req.body.email)) {
    next();
  } else {
    return res.status(400).json({ result: "Dữ liệu gửi lên còn thiếu" });
  }
};
export const mConfirmEmail = (req, res, next) => {
  if (req.body.code) {
    next();
  } else {
    return res.status(400).json({ result: "Dữ liệu gửi lên còn thiếu" });
  }
};
export const mUpdate = (req, res, next) => {
  if (
    validate.validatePhone(req.body.phone) ||
    validate.validateString(req.body.address)
  ) {
    console.log(validate.validatePhone(req.body.phone));
    console.log(validate.validateString(req.body.address));
    req.body.update = {};
    if (req.body.phone) {
      req.body.update.phone = req.body.phone;
    } else {
      req.body.update.address = req.body.address;
    }
    next();
  } else {
    return res
      .status(400)
      .json({ result: "Dữ liệu gửi lên còn thiếu hoặc không hợp lệ" });
  }
};
