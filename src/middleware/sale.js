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
                customer: req.body.customer,
                product: req.body.product,
                shop: req.body.payload.shop,
            };
            if (req.body.voucher) {
                req.body.bill.voucher = req.body.voucher;
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
        validate.validateCardNumber(req.body.code) &&
        validate.validateString(req.body.name) &&
        validate.validateString(req.body.address) &&
        validate.validatePhone(req.body.phone)
    ) {
        let customer = {
            name: req.body.name,
            address: req.body.address,
            cardID: {
                code: req.body.code,
            },
            phone: req.body.phone,
            shop: req.body.payload.shop,
        };
        req.body.customer = customer;
        next();
    } else {
        return res.json({ success: false, result: "Dữ liệu yêu cầu còn thiếu" });
    }
};
export const mUpdateVoucherOfBilling = (req, res, next) => {
    if (req.body.voucher) {
        next();
    } else {
        return res.json({ success: false, result: "Dữ liệu yêu cầu còn thiếu" });
    }
};
export const mCreateVoucher = (req, res, next) => {
    if (req.body.conditionTotal && req.body.time) {
        req.body.voucher = {
            time: req.body.time,
            conditionTotal: req.body.conditionTotal,
            shop: req.body.payload.shop,
        };
        if (req.body.percent || req.body.money || req.body.description) {
            if (req.body.description) {
                req.body.voucher.description = req.body.description;
            }
            if (req.body.percent || req.body.money) {
                if (req.body.percent) {
                    req.body.voucher.percent = req.body.percent;
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