import * as validate from "../../validate/validate.js";
export const mPermission = (req, res, next) => {
    if (req.body.payload.permission == "sales manager") {
        next();
    } else {
        return res.json({
            success: false,
            result: "Bạn không thể sử dụng chức năng này",
        });
    }
};
export const mCreateBill = (req, res, next) => {
    if (validate.validateString(req.body.customer) && req.body.product) {
        if (req.body.product.length > 0) {
            req.body.bill = {
                customer: req.body.customer.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
                product: req.body.product.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
                shop: req.body.payload.shop,
            };
            if (req.body.voucher) {
                req.body.bill.voucher = req.body.voucher.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
            }
            console.log(req.body.bill);
            next();
        } else {
            return res.json({
                success: false,
                result: "Dach sách sản phẩm còn trống",
            });
        }
    } else {
        return res.json({ success: false, result: "Dữ liệu yêu cầu còn thiếu" });
    }
};
export const mCreateCustomer = (req, res, next) => {
    if (
        validate.validateCardNumber(req.body.code.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')) &&
        validate.validateString(req.body.name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')) &&
        validate.validatePhone(req.body.phone.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
    ) {
        let customer = {
            name: req.body.name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
            cardID: {
                code: req.body.code.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
            },
            phone: req.body.phone.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
            shop: req.body.payload.shop,
        };
        req.body.customer = customer;
        console.log(req.body)
        next();
    } else {
        console.log(req.body)
        return res.json({ success: false, result: "Dữ liệu yêu cầu còn thiếu hoặc không hợp lệ" });
    }
};
export const mUpdateVoucherOfBilling = (req, res, next) => {
    if (req.body.voucher.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')) {
        req.body.voucher = req.body.voucher.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
        next();
    } else {
        return res.json({ success: false, result: "Dữ liệu yêu cầu còn thiếu" });
    }
};
export const mCreateVoucher = (req, res, next) => {
    if (req.body.conditionTotal && req.body.time) {
        req.body.voucher = {
            time: req.body.time.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
            conditionTotal: req.body.conditionTotal.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
            shop: req.body.payload.shop,
        };
        if (req.body.percent || req.body.money || req.body.description) {
            if (req.body.description) {
                req.body.voucher.description = req.body.description.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
            }
            if (req.body.percent || req.body.money) {
                if (req.body.percent) {
                    req.body.voucher.percent = req.body.percent.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
                } else {
                    req.body.voucher.money = req.body.money;
                }
            }
        }
        next();
    } else {
        return res.json({ success: false, result: "Dữ liệu yêu cầu còn thiếu" });
    }
};
export const mUpdatePayment = (req, res, next) => {
    if (req.body.total || req.body.paid) {
        if (req.body.total > 1000 && req.body.paid > 1000) {
            next()
        } else {
            return res.json({ success: false, result: "Dữ liệu không phù hợp" });
        }
    } else {
        return res.json({ success: false, result: "Dữ liệu yêu cầu còn thiếu" });
    }
}