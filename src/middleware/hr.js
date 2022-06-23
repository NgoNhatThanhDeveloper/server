import * as validate from "../../validate/validate.js";
export const mPermission = (req, res, next) => {
    if (req.body.payload.permission == "hr") {
        next();
    } else {
        return res.json({
            success: false,
            result: "bạn không được quyền sử dụng chức năng này !",
        });
    }
};
export const mCreate = (req, res, next) => {
    if (
        req.body.account &&
        req.body.password &&
        req.body.email &&
        req.body.permission &&
        req.body.name &&
        req.body.address &&
        req.body.phone &&
        req.body.code
    ) {
        req.body.permission = req.body.permission.replace(
            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
            ""
        );
        if (req.body.permission == ("ceo", "hr")) {
            return res.json({
                success: false,
                result: "Bạn không thể sử dụng chức năng này",
            });
        } else {
            req.body.account = {
                account: req.body.account.replace(
                    /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                    ""
                ),
                password: req.body.password.replace(
                    /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                    ""
                ),
                authenticator: {
                    email: req.body.email.replace(
                        /[`~!#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi,
                        ""
                    ),
                },
                shop: req.body.payload.shop,
                permission: req.body.permission.replace(
                    /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                    ""
                ),
                information: {
                    name: req.body.name.replace(
                        /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                        ""
                    ),
                    address: req.body.address.replace(
                        /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                        ""
                    ),
                    phone: req.body.phone.replace(
                        /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                        ""
                    ),
                    cardID: {
                        code: req.body.code.replace(
                            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                            ""
                        ),
                    },
                },
            };
            next();
        }
    } else {
        return res.json({ success: false, result: "Dữ liệu còn thiếu" });
    }
};
export const mUpdatePermissions = (req, res, next) => {
    if (req.body.permission) {
        req.body.permission = req.body.permission.replace(
            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
            ""
        );
        if (req.body.permission == "ceo" || req.body.permission == "hr") {
            return res.json({
                success: false,
                result: "Bạn không thể tạo quyền này",
            });
        } else {
            next();
        }
    } else {
        return res.json({ success: false, result: "Dữ liệu còn thiếu" });
    }
};
export const mUpdateSalary = (req, res, next) => {
    console.log(req.body);
    if (req.body.salary || req.body.bonus) {
        next();
    } else {
        return res.json({ success: false, result: "Dữ liệu còn thiếu" });
    }
};