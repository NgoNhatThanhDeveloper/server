import * as validate from "../../validate/validate.js";
export const mReplaceEmail = (req, res, next) => {
    if (validate.validateEmail(req.body.email)) {
        req.body.email = req.body.email.replace(/[`~!#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '')
        next();
    } else {
        return res.json({ success: false, result: "Dữ liệu gửi lên còn thiếu" });
    }
};
export const mConfirmEmail = (req, res, next) => {
    if (req.body.code) {
        next();
    } else {
        return res.json({ success: false, result: "Dữ liệu gửi lên còn thiếu" });
    }
};
export const mUpdate = (req, res, next) => {
    if (
        validate.validatePhone(req.body.phone.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')) ||
        validate.validateString(req.body.address.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
    ) {
        req.body.update = {};
        if (req.body.phone) {
            req.body.update.phone = req.body.phone.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
        } else {
            req.body.update.address = req.body.address.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
        }
        next();
    } else {
        return res
            .json({ success: false, result: "Dữ liệu gửi lên còn thiếu hoặc không hợp lệ" });
    }
};