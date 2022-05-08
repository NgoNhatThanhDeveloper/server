import * as service from "../service/authentication.js";
export const loginCtrl = (req, res) => {
  service.loginService(req, res);
};
export const logoutCtrl = (req, res) => {
  service.logoutService(req, res);
};
export const tokenCtrl = (req, res) => {
  service.tokenService(req, res);
};
export const changeCtrl = (req, res) => {
  service.changeService(req, res);
};
export const missingCtrl = (req, res) => {
  service.missingService(req, res);
};
export const confirmCtrl = (req, res) => {
  service.confirmService(req, res);
};
