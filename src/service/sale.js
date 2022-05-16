import * as repository from "../repository/sale.js";
export const createBillService = (req, res) => {
    repository
        .createBill(req.body.bill)
        .then((bill) => {
            return res.json({ success: true, result: "Yêu cầu thành công", data: bill });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};
export const createCustomerService = (req, res) => {
    repository
        .createCustomer(req.body.customer, req.files)
        .then((id_customer) => {
            return res

                .json({ success: true, result: "Yêu cầu thành công", data: id_customer });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};
export const removeBillService = (req, res) => {
    repository
        .removeBill(req.params.id, req.body.payload.shop)
        .then(() => {
            return res.json({ success: true, result: "Yêu cầu thành công" });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};
export const updateVoucherOfBillService = (req, res) => {
    repository
        .updateVoucherOfBill(req.params.id, req.body.payload.shop, req.body.voucher)
        .then((bill) => {
            return res.json({ success: true, result: "Yêu cầu thành công", data: bill });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};
export const showBillService = (req, res) => {
    req.query.shop = req.body.payload.shop;
    repository
        .showBill(req.query)
        .then((bills) => {
            return res

                .json({ success: true, result: "Yêu cầu thành công", data: bills });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};
export const createVoucherService = (req, res) => {
    repository
        .createVoucher(req.body.voucher)
        .then(() => {
            return res

                .json({ success: true, result: "Yêu cầu thành công" });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};
export const removeVoucherService = (req, res) => {
    repository
        .removeVoucher(req.params.id, req.body.payload.shop)
        .then(() => {
            return res

                .json({ success: true, result: "Yêu cầu thành công" });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};
export const showVoucherService = (req, res) => {
    req.query.shop = req.body.payload.shop;
    repository
        .showVoucher(req.query)
        .then((vouchers) => {
            return res

                .json({ success: true, result: "Yêu cầu thành công", data: vouchers });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};
export const updatePayment = (req, res) => {
    repository
        .updatePayment(
            req.params.id,
            req.body.payload.shop,
            req.body.total,
            req.body.paid
        )
        .then(() => {
            return res
                .json({ success: true, result: "Yêu cầu thành công" });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};
export const showPaymentService = (req, res) => {
    req.query.shop = req.body.payload.shop;
    repository
        .showPayment(req.query)
        .then((payments) => {
            return res
                .json({ success: true, result: "Yêu cầu thành công", data: payments });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};
export const showCustomer = (req, res) => {
    req.query.shop = req.body.payload.shop;
    repository
        .showCustomer(req.params.id, req.body.payload.shop)
        .then((customer) => {
            return res
                .json({ success: true, result: "Yêu cầu thành công", data: customer });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};