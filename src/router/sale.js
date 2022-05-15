import express from "express";
const router = express.Router();
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
import * as mToken from "../middleware/jsonToken.js";
import * as mMiddleware from "../middleware/sale.js";
import * as mController from "../controller/sale.js";
router.get(
    "/voucher/query",
    upload.none(),
    mToken.mAccessToken,
    mMiddleware.mPermission,
    mController.showVoucherCtrl
);
router.get(
    "/payment/query",
    mToken.mAccessToken,
    mMiddleware.mPermission,
    mController.showPaymentCtrl
);
router.get(
    "/bill/query",
    upload.none(),
    mToken.mAccessToken,
    mMiddleware.mPermission,
    mController.showBillCtrl
);
router.get(
    "/customer/query",
    upload.none(),
    mToken.mAccessToken,
    mMiddleware.mPermission,
    mController.showCustomerCtrl
);
router.post(
    "/voucher/create",
    upload.none(),
    mToken.mAccessToken,
    mMiddleware.mPermission,
    mMiddleware.mCreateVoucher,
    mController.createVoucherCtrl
);

router.post(
    "/customer/create",
    upload.fields([
        { name: "front", maxCount: 1 },
        { name: "back", maxCount: 1 },
        { name: "avatar", maxCount: 1 },
    ]),
    mToken.mAccessToken,
    mMiddleware.mPermission,
    mMiddleware.mCreateCustomer,
    mController.createCustomerCtrl
);
router.post(
    "/bill/create",
    upload.none(),
    mToken.mAccessToken,
    mMiddleware.mPermission,
    mMiddleware.mCreateBill,
    mController.createBillCtrl
);
router.delete(
    "/voucher/:id/remove",
    upload.none(),
    mToken.mAccessToken,
    mMiddleware.mPermission,
    mController.removeVoucherCtrl
);
router.delete(
    "/bill/:id/remove",
    upload.none(),
    mToken.mAccessToken,
    mMiddleware.mPermission,
    mController.removeBillCtrl
);
router.put(
    "/bill/voucher",
    upload.none(),
    mToken.mAccessToken,
    mMiddleware.mPermission,
    mController.updateVoucherOfBillCtrl
);
router.post(
    "/payment/:id/update",
    upload.none(),
    mToken.mAccessToken,
    mMiddleware.mPermission,
    mMiddleware.mUpdatePayment,
    mController.updatePaymentCtrl
);
export default router;