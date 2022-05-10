import express from "express";
const router = express.Router();
import * as mToken from "../middleware/jsonToken.js";
import * as mMiddleware from "../middleware/product.js";
import * as mController from "../controller/product.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
router.get(
  "/show/query",
  upload.none(),
  mToken.mAccessToken,
  mController.showProductCtrl
);
router.post(
  "/create",
  upload.array("product", 10),
  mToken.mAccessToken,
  mMiddleware.mPermission,
  mMiddleware.mCreate,
  mController.createProductCtrl
);
router.post(
  "/:id/image/update",
  upload.array("product", 10),
  mToken.mAccessToken,
  mMiddleware.mPermission,
  mController.updateImageProductCtrl
);
router.post(
  "/:id/update",
  upload.none(),
  mToken.mAccessToken,
  mMiddleware.mPermission,
  mMiddleware.mUpdate,
  mController.updateProductCtrl
);
router.delete(
  "/:id/delete",
  upload.none(),
  mToken.mAccessToken,
  mMiddleware.mPermission,
  mController.removeProductCtrl
);
export default router;
