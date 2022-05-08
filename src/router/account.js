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
  mToken.mAccessToken,
  mMiddleware.mUpdate,
  mController.updateInformationCtrl
);
router.get("/email/request", mToken.mAccessToken, mController.requestEmailCtrl);
router.post(
  "email/confirm",
  mToken.mAccessToken,
  mMiddleware.mConfirmEmail,
  mController.confirmEmailCtrl
);
router.put(
  "/email/replace",
  mToken.mAccessToken,
  mMiddleware.mReplaceEmail,
  mController.replaceEmailCtrl
);
router.get("/info", mToken.mAccessToken, mController.showInformationCtrl);
export default router;
