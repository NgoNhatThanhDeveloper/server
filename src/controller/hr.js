import * as service from "../service/hr.js";
export const createEmployCtrl = (req, res) => {
  service.createEmployService(req, res);
};
export const updatePermissionOfEmployCtrl = (req, res) => {
  service.updatePermissionOfEmployService(req, res);
};
export const removeEmployCtrl = (req, res) => {
  service.removeEmployService(req, res);
};
export const updateSalaryOfEmployCtrl = (req, res) => {
  service.updateSalaryOfEmployService(req, res);
};
export const showInformationEmployCtrl = (req, res) => {
  service.showInformationEmployService(req, res);
};
