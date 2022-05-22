import * as repository from "../repository/ceo.js";
import { sendEmail } from "../../utils/sendEmail.js";
export const createHRService = (req, res) => {
    repository
        .createHR(req.body.account, req.files)
        .then((account) => {
            return sendEmail(
                account.email,
                `Bạn đã được xét duyệt vị trí HR, tài khoản : ${account.account}, mật khẩu là : ${account.password}`
            );
        })
        .then(() => {
            return res.json({ success: true, result: "Thành công" });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};
export const createShopService = (req, res) => {
    repository
        .createSHOP(req.body.shop, req.files)
        .then(() => {
            return res.json({ success: true, result: "Thành công" });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};
export const replaceHRService = (req, res) => {
    repository
        .replaceHR(req.body.shop, req.body.boss)
        .then((result) => {
            return sendEmail(
                result.email,
                `Bạn được bổ nhiệm phụ trách cửa hàng ${result.shop.name} tại ${result.shop.address}`
            );
        })
        .then(() => {
            return res.json({ success: true, result: "Thành công" });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};
export const removeSHOPService = (req, res) => {
    repository
        .removeSHOP(req.params.id)
        .then(() => {
            return res.json({ success: true, result: "Thành công" });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};
export const removeHRService = (req, res) => {
    repository
        .removeHR(req.params.id)
        .then(() => {
            return res.json({ success: true, result: "Thành công" });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};
export const updateSalaryHRService = (req, res) => {
    repository
        .updateSalaryOfHR(req.params.id, req.body.salary, req.body.bonus)
        .then(() => {
            return res.json({ success: true, result: "Thành công" });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};
export const showHRService = (req, res) => {
    req.query.permission = "hr";
    repository
        .showHR(req.query)
        .then((hr) => {
            return res

                .json({ success: true, result: "Yêu cầu thành công", data: hr });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};
export const showShopService = (req, res) => {
    repository
        .showSHOP(req.query)
        .then((shop) => {
            return res

                .json({ success: true, result: "Yêu cầu thành công", data: shop });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};