import * as service from "../service/account.js";
export const updateAvatarCtrl = (req, res) => {
  service.updateAvatarService(req, res);
};
export const showInformationCtrl = (req, res) => {
  service.showInformationService(req, res);
};
export const requestEmailCtrl = (req, res) => {
  service.requestEmailService(req, res);
};
export const confirmEmailCtrl = (req, res) => {
  service.confirmEmailService(req, res);
};
export const replaceEmailCtrl = (req, res) => {
  service.replaceEmailService(req, res);
};
export const updateInformationCtrl = (req, res) => {
  service.updateInformationService(req, res);
};
