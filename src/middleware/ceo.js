import * as validate from "../../validate/validate.js";
export const mPermission = (req, res, next) => {
  if (req.body.payload.permission == "ceo") {
    next();
  } else {
    return res.json({success: false,
      result: "Bạn không thể tạo vị trí làm việc này do không đủ quyền hạn",
    });
  }
};
export const mCreateHR = (req, res, next) => {
  if (
    validate.validateString(req.body.account) &&
    validate.validateString(req.body.password) &&
    validate.validateEmail(req.body.email) &&
    validate.validateString(req.body.name) &&
    validate.validateString(req.body.address) &&
    validate.validatePhone(req.body.phone) &&
    validate.validateCardNumber(req.body.code)
  ) {
    req.body.account = {
      account: req.body.account,
      password: req.body.password,
      authenticator: {
        email: req.body.email,
      },
      permission: "hr",
      information: {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        cardID: {
          code: req.body.code,
        },
      },
    };
    if (req.body.permission == ("ceo", "hr")) {
      return res.json({success: false,
        result: "Bạn không thể tạo vị trí làm việc này do không đủ quyền hạn",
      });
    } else {
      next();
    }
  } else {
    return res
      
      .json({success: false, result: "Dữ liệu gửi lên còn trống hoặc không hợp lệ" });
  }
};
export const mCreateSHOP = (req, res, next) => {
  if (
    validate.validateString(req.body.name) &&
    validate.validateString(req.body.address)
  ) {
    let shop = {
      name: req.body.name,
      address: req.body.address,
    };
    if (validate.validatePhone(req.body.phone)) {
      shop.phone = req.body.phone;
    }
    req.body.shop = shop;
    next();
  } else {
    return res
      
      .json({success: false, result: "Dữ liệu gửi lên còn trống hoặc không hợp lệ" });
  }
};
export const mReplaceHR = (req, res, next) => {
  if (req.body.shop && req.body.boss) {
    next();
  } else {
    return res
      
      .json({ success: false,result: "Dữ liệu gửi lên còn trống hoặc không hợp lệ" });
  }
};
export const mUpdateSalary = (req, res, next) => {
  if (req.body.salary || req.body.bonus) {
    next();
  } else {
    return res
      
      .json({ success: false,result: "Dữ liệu gửi lên còn trống hoặc không hợp lệ" });
  }
};
