import * as validate from "../../validate/validate.js";
export const mPermission = (req, res, next) => {
    if (req.body.payload.permission == "hr") {
        next();
    } else {
        return res

            .json({ success: false, result: "You do not have the right to use this function" });
    }
};
export const mCreate = (req, res, next) => {
    if (
        validate.validateString(req.body.account.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')) &&
        validate.validatePassword(req.body.password.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')) &&
        validate.validateEmail(req.body.email.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')) &&
        req.body.permission.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '') &&
        validate.validateString(req.body.name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')) &&
        validate.validateString(req.body.address.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')) &&
        validate.validatePhone(req.body.phone.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')) &&
        validate.validateCardNumber(req.body.code.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
    ) {
        req.body.account = {
            account: req.body.account.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
            password: req.body.password.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
            authenticator: {
                email: req.body.email.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
            },
            shop: req.body.payload.shop,
            permission: req.body.permission.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
            information: {
                name: req.body.name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
                address: req.body.address.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
                phone: req.body.phone.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
                cardID: {
                    code: req.body.code.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
                },
            },
        };
        if (req.body.permission == ("ceo", "hr")) {
            return res

                .json({ success: false, result: "you can't create this permission" });
        } else {
            next();
        }
    } else {
        return res.json({ success: false, result: "Data left empty" });
    }
};
export const mUpdatePermissions = (req, res, next) => {
    if (req.body.permission) {
        if (req.body.permission.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '') == "ceo" || req.body.permission.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '') == "hr") {
            return res

                .json({ success: false, result: "you can't create this permission" });
        } else {
            next();
        }
    } else {
        return res.json({ success: false, result: "Data left empty" });
    }
};
export const mUpdateSalary = (req, res, next) => {
    if (req.body.salary) {
        next();
    } else {
        return res.json({ success: false, result: "Data left empty" });
    }
};