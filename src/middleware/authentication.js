export const mLogin = (req, res, next) => {
  if (req.body.account && req.body.password) {
    next();
  } else {
    return res.status(401).json({ success: false,result: "Dữ liệu gửi lên còn thiếu" });
  }
};
export const mChange = (req, res, next) => {
  if (req.body.password && req.body.password_replace) {
    next();
  } else {
    return res.status(401).json({ success: false,result: "Dữ liệu gửi lên còn thiếu" });
  }
};
export const mMissing = (req, res, next) => {
  if (req.body.account && req.body.email) {
    next();
  } else {
    return res.status(401).json({ success: false,result: "Dữ liệu gửi lên còn thiếu" });
  }
};
export const mConfirm = (req, res, next) => {
  if (req.body.account && req.body.value) {
    next();
  } else {
    return res.status(401).json({success: false, result: "Dữ liệu gửi lên còn thiếu" });
  }
};
export const mToken = (req, res, next) => {
  if (req.headers.access_token && req.headers.refresh_token) {
    next();
  } else {
    return res.status(401).json({success: false, result: "Dữ liệu gửi lên còn thiếu" });
  }
};
