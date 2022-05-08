import * as validate from "../../validate/validate.js";
export const mPermission = (req, res, next) => {
  if (req.body.payload.permission == "hr") {
    next();
  } else {
    return res
      
      .json({ success: false,result: "You do not have the right to use this function" });
  }
};
export const mCreate = (req, res, next) => {
  if (
    validate.validateString(req.body.account) &&
    validate.validatePassword(req.body.password) &&
    validate.validateEmail(req.body.email) &&
    req.body.permission &&
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
      shop: req.body.payload.shop,
      permission: req.body.permission,
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
      return res
        
        .json({success: false, result: "you can't create this permission" });
    } else {
      next();
    }
  } else {
    return res.json({ success: false,result: "Data left empty" });
  }
};
export const mUpdatePermissions = (req, res, next) => {
  if (req.body.permission) {
    if (req.body.permission == "ceo" || req.body.permission == "hr") {
      return res
        
        .json({ success: false,result: "you can't create this permission" });
    } else {
      next();
    }
  } else {
    return res.json({success: false, result: "Data left empty" });
  }
};
export const mUpdateSalary = (req, res, next) => {
  if (req.body.salary) {
    next();
  } else {
    return res.json({success: false, result: "Data left empty" });
  }
};
