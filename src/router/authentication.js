import express from "express";
const router = express.Router();
import * as mToken from "../middleware/jsonToken.js";
import * as mMiddleware from "../middleware/authentication.js";
import * as mController from "../controller/authentication.js";
router.post("/login", mMiddleware.mLogin, mController.loginCtrl);
router.get(
  "/logout",
  mToken.mAccessTokenExp,
  mToken.mRefreshToken,
  mController.logoutCtrl
);
router.post(
  "/change",
  mToken.mAccessToken,
  mMiddleware.mChange,
  mController.changeCtrl
);
router.post("/missing-password", mMiddleware.mMissing, mController.missingCtrl);
router.post("/confirm", mMiddleware.mConfirm, mController.confirmCtrl);
router.get(
  "/token",
  mMiddleware.mToken,
  mToken.mAccessTokenExp,
  mToken.mRefreshToken,
  mController.tokenCtrl
);
export default router;
