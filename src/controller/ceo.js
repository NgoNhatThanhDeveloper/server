import * as service from "../service/ceo.js";
export const createShopCtr = (req, res) => {
  service.createShopService(req, res);
};
export const createHrCtrl = (req, res) => {
  service.createHRService(req, res);
};
export const replaceHRCtrl = (req, res) => {
  service.replaceHRService(req, res);
};
export const removeShopCtr = (req, res) => {
  service.removeSHOPService(req, res);
};
export const removeHrCtr = (req, res) => {
  service.removeHRService(req, res);
};
export const updateSalaryOfHrCtr = (req, res) => {
  service.updateSalaryHRService(req, res);
};
export const showHrCtrl = (req, res) => {
  service.showHRService(req, res);
};
export const showShopCtrl = (req, res) => {
  service.showShopService(req, res);
};
