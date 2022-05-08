import * as repository from "../repository/account.js";
import { sendEmail } from "../../utils/sendEmail.js";
export const updateAvatarService = (req, res) => {
  repository
    .updateAvatar(req.body.payload.code, req.file)
    .then(() => {
      return res.status(200).json({ result: "Yêu cầu thành công" });
    })
    .catch((error) => {
      return res.status(400).json({ result: error.message });
    });
};
export const showInformationService = (req, res) => {
  repository
    .showInformation(req.body.payload.code)
    .then((information) => {
      return res.status(200).json({ result: "Yêu cầu thành công", data: information });
    })
    .catch((error) => {
      return res.status(400).json({ result: error.message });
    });
};
export const requestEmailService = (req, res) => {
  repository
    .requestEmail(req.body.payload.code)
    .then((result) => {
      return sendEmail(
        result.email,
        `Mã xác thực của bạn là : ${result.code}, có thời hạn đến ${result.time}`
      );
    })
    .then(() => {
      return res.status(200).json({
        result:
          "Yêu cầu thành công, kiểm tra mã xác thực trong email của bạn. Mã xác thực có thời hạn là 5 phút",
      });
    })
    .catch((error) => {
      return res.status(400).json({ result: error.message });
    });
};
export const confirmEmailService = (req, res) => {
  repository
    .confirmEmail(req.body.payload.code, req.body.code)
    .then(() => {
      return res.status(200).json({
        result: "Yêu cầu thành công, giờ bạn có thể đăng ký email mới",
      });
    })
    .catch((error) => {
      return res.status(400).json({ result: error.message });
    });
};
export const replaceEmailService = (req, res) => {
  repository
    .replaceEmail(req.body.payload.code, req.body.email)
    .then(() => {
      return res.status(200).json({
        result:
          "Yêu cầu thành công, email mới được xác thực,từ giờ các yêu cầu  sẽ dựa trên email này để xác thực",
      });
    })
    .catch((error) => {
      return res.status(400).json({ result: error.message });
    });
};
export const updateInformationService = (req, res) => {
  repository
    .updateInformation(req.body.payload.code, req.body.update)
    .then(() => {
      return res.status(200).json({
        result: "Yêu cầu thành công",
      });
    })
    .catch((error) => {
      return res.status(400).json({ result: error.message });
    });
};
