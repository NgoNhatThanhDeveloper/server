import * as service from "../service/sale.js";
export const createBillCtrl = (req, res) => {
    service.createBillService(req, res);
};
export const createCustomerCtrl = (req, res) => {
    service.createCustomerService(req, res);
};
export const removeBillCtrl = (req, res) => {
    service.removeBillService(req, res);
};
export const updateVoucherOfBillCtrl = (req, res) => {
    service.updateVoucherOfBillService(req, res);
};
export const showBillCtrl = (req, res) => {
    service.showBillService(req, res);
};
export const createVoucherCtrl = (req, res) => {
    service.createVoucherService(req, res);
};
export const removeVoucherCtrl = (req, res) => {
    service.removeVoucherService(req, res);
};
export const updateVoucherCtrl = (req, res) => {
    service.updateVoucherService(req, res);
};
export const showVoucherCtrl = (req, res) => {
    service.showVoucherService(req, res);
};
export const showPaymentCtrl = (req, res) => {
    service.showPaymentService(req, res);
};
export const updatePaymentCtrl = (req, res) => {
    service.updatePayment(req, res);
};
export const showCustomerCtrl = (req, res) => {
    service.showCustomer(req, res);
};