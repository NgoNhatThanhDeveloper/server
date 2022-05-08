import * as service from "../service/product.js";
export const createProductCtrl = (req, res) => {
  service.createProductService(req, res);
};
export const updateProductCtrl = (req, res) => {
  service.updateProductService(req, res);
};
export const updateImageProductCtrl = (req, res) => {
  service.updateImageProductService(req, res);
};
export const removeProductCtrl = (req, res) => {
  service.removeProductService(req, res);
};
export const showProductCtrl = (req, res) => {
  service.showProductService(req, res);
};
