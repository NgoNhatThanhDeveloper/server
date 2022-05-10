import express from "express";
const router = express.Router();
import * as mToken from "../middleware/jsonToken.js";
import * as mMiddleware from "../middleware/hr.js";
import * as mController from "../controller/hr.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
router.get(
  "/employ/query",
  upload.none(),
  mToken.mAccessToken,
  mMiddleware.mPermission,
  mController.showInformationEmployCtrl
);
router.post(
  "/employ/create",
  upload.fields([
    { name: "front", maxCount: 1 },
    { name: "back", maxCount: 1 },
    { name: "avatar", maxCount: 1 },
  ]),
  mToken.mAccessToken,
  mMiddleware.mPermission,
  mMiddleware.mCreate,
  mController.createEmployCtrl
);
router.put(
  "/employ/:id/update",
  upload.none(),
  mToken.mAccessToken,
  mMiddleware.mPermission,
  mMiddleware.mUpdatePermissions,
  mController.updatePermissionOfEmployCtrl
);
router.put(
  "/salary/:id/update",
  upload.none(),
  mToken.mAccessToken,
  mMiddleware.mPermission,
  mMiddleware.mUpdateSalary,
  mController.updateSalaryOfEmployCtrl
);
router.delete(
  "/:id/remove",
  upload.none(),
  mToken.mAccessToken,
  mController.removeEmployCtrl
);
export default router;
