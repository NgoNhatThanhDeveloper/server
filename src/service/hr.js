import * as repository from "../repository/hr.js";
import { sendEmail } from "../../utils/sendEmail.js";
export const createEmployService = (req, res) => {
  repository
    .createEmploy(req.body.account, req.body.salary, req.files)
    .then((account) => {
      return sendEmail(
        account.authenticator.email,
        `account : ${account.account} , password : ${account.password}`
      );
    })
    .then(() => {
      return res
        .status(200)
        .json({ result: "Thành công, đã thông báo đến nhân viên qua email" });
    })
    .catch((error) => {
      return res.status(400).json({ result: error.message });
    });
};
export const updatePermissionOfEmployService = (req, res) => {
  const request = {
    query: { _id: req.params.id, shop: req.body.payload.shop },
    permission: req.body.permission,
  };
  repository
    .updatePermissionOfEmploy(request)
    .then(() => {
      return res.status(200).json({ result: "Thành công" });
    })
    .catch((error) => {
      return res.status(400).json({ result: error.message });
    });
};
export const removeEmployService = (req, res) => {
  repository
    .removeEmploy(
      req.params.id,
      req.body.payload.shop,
      req.body.payload.permission
    )
    .then(() => {
      return res.status(200).json({ result: "Thành công" });
    })
    .catch((error) => {
      return res.status(400).json({ result: error.message });
    });
};
export const updateSalaryOfEmployService = (req, res) => {
  const request = {
    query: { _id: req.params.id },
    update: req.body.salary,
  };
  repository
    .updateSalaryOfEmploy(request)
    .then(() => {
      return res.status(200).json({ result: "Thành công" });
    })
    .catch((error) => {
      return res.status(400).json({ result: error.message });
    });
};
export const showInformationEmployService = (req, res) => {
  req.query.shop = req.body.payload.shop;
  repository
    .showInformationEmploy(req.query)
    .then((employ) => {
      return res.status(200).json({ result: employ });
    })
    .catch((error) => {
      return res.status(400).json({ result: error.message });
    });
};
