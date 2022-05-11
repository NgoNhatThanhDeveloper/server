import express from "express";
const router = express.Router();
import * as mToken from "../middleware/jsonToken.js";
import * as mMiddleware from "../middleware/authentication.js";
import * as mController from "../controller/authentication.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
router.post("/login", upload.none(), mMiddleware.mLogin, mController.loginCtrl);
router.post(
  "/logout",
  mToken.mAccessToken,
  mController.logoutCtrl
);
router.post(
  "/change",
  upload.none(),
  mToken.mAccessToken,
  mMiddleware.mChange,
  mController.changeCtrl
);
router.post(
  "/missing-password",
  upload.none(),
  mMiddleware.mMissing,
  mController.missingCtrl
);
router.post(
  "/confirm",
  upload.none(),
  mMiddleware.mConfirm,
  mController.confirmCtrl
);
router.get(
  "/token",
  mMiddleware.mToken,
  mToken.mAccessTokenExp,
  mToken.mRefreshToken,
  mController.tokenCtrl
);
export default router;
