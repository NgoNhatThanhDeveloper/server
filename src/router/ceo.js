import express from "express";
const router = express.Router();
import * as mToken from "../middleware/jsonToken.js";
import * as mMiddleware from "../middleware/ceo.js";
import * as mController from "../controller/ceo.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
router.get("/shop/query", mToken.mAccessToken, mController.showShopCtrl);
router.get("/HR/query", mToken.mAccessToken, mController.showHrCtrl);
router.post(
    "/shop/create",
    upload.single("shop"),
    mToken.mAccessToken,
    mMiddleware.mCreateSHOP,
    mController.createShopCtr
);
router.post(
    "/HR/create",
    upload.fields([
        { name: "front", maxCount: 1 },
        { name: "back", maxCount: 1 },
        { name: "avatar", maxCount: 1 },
    ]),
    mToken.mAccessToken,
    mMiddleware.mCreateHR,
    mController.createHrCtrl
);
router.put(
    "/HR/salary/:id/update",
    upload.none(),
    mToken.mAccessToken,
    mMiddleware.mUpdateSalary,
    mController.updateSalaryOfHrCtr
);
router.delete(
    "/HR/:id/remove",
    upload.none(),
    mToken.mAccessToken,
    mController.removeHrCtr
);
router.delete(
    "/shop/:id/remove",
    upload.none(),
    mToken.mAccessToken,
    mController.removeShopCtr
);
router.put(
    "/shop/replace",
    upload.none(),
    mToken.mAccessToken,
    mMiddleware.mReplaceHR,
    mController.replaceHRCtrl
);
export default router;