import express from "express";
const router = express.Router();
import * as mToken from "../middleware/jsonToken.js";
import * as mMiddleware from "../middleware/account.js";
import * as mController from "../controller/account.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
router.post(
  "/update/avatar",
  upload.single("avatar"),
  mToken.mAccessToken,
  mController.updateAvatarCtrl
);
router.put(
  "/info/update",
  upload.none(),
  mToken.mAccessToken,
  mMiddleware.mUpdate,
  mController.updateInformationCtrl
);
router.get(
  "/email/request",
  upload.none(),
  mToken.mAccessToken,
  mController.requestEmailCtrl
);
router.post(
  "email/confirm",
  upload.none(),
  mToken.mAccessToken,
  mMiddleware.mConfirmEmail,
  mController.confirmEmailCtrl
);
router.put(
  "/email/replace",
  upload.none(),
  mToken.mAccessToken,
  mMiddleware.mReplaceEmail,
  mController.replaceEmailCtrl
);
router.get("/info", mToken.mAccessToken, mController.showInformationCtrl);
export default router;
