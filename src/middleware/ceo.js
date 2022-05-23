import * as validate from "../../validate/validate.js";
export const mPermission = (req, res, next) => {
    if (req.body.payload.permission == "ceo") {
        next();
    } else {
        return res.json({
            success: false,
            result: "Bạn không thể tạo vị trí làm việc này do không đủ quyền hạn",
        });
    }
};
export const mCreateHR = (req, res, next) => {
    if (
        req.body.account &&
        req.body.password &&
        req.body.email &&
        req.body.name &&
        req.body.address &&
        req.body.phone &&
        req.body.code
    ) {
        if (req.body.payload.permission != "ceo") {
            return res.json({
                success: false,
                result: "Bạn không thể tạo vị trí làm việc này do không đủ quyền hạn",
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
                        /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                        ""
                    ),
                },
                permission: "hr",
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
        return res.json({
            success: false,
            result: "Dữ liệu gửi lên còn trống hoặc không hợp lệ",
        });
    }
};
export const mCreateSHOP = (req, res, next) => {
    if (req.body.name && req.body.address) {
        let shop = {
            name: req.body.name.replace(
                /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                ""
            ),
            address: req.body.address.replace(
                /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                ""
            ),
        };
        if (req.body.phone) {
            shop.phone = req.body.phone.replace(
                /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                ""
            );
        }
        req.body.shop = shop;
        next();
    } else {
        return res.json({
            success: false,
            result: "Dữ liệu gửi lên còn trống hoặc không hợp lệ",
        });
    }
};
export const mReplaceHR = (req, res, next) => {
    if (req.body.shop && req.body.boss) {
        req.body.shop = req.body.shop.replace(
            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
            ""
        );
        req.body.boss = req.body.boss.replace(
            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
            ""
        );
        next();
    } else {
        return res.json({
            success: false,
            result: "Dữ liệu gửi lên còn trống hoặc không hợp lệ",
        });
    }
};
export const mUpdateSalary = (req, res, next) => {
    if (req.body.salary || req.body.bonus) {
        next();
    } else {
        return res.json({
            success: false,
            result: "Dữ liệu gửi lên còn trống hoặc không hợp lệ",
        });
    }
};