export const mPermission = (req, res, next) => {
    if (
        req.body.payload.permission == "product management"
    ) {
        next();
    } else {
        return res.json({
            success: false,
            result: "You can't use this function ",
        });
    }
};

export const mCreate = (req, res, next) => {
    if (req.body.ID && req.body.type && req.body.size) {
        req.body.product = {
            ID: req.body.ID,
            type: req.body.type,
            size: req.body.size,
            shop: req.body.payload.shop,
        };
        if (req.body.money) {
            req.body.product.money = req.body.money;
        }
        if (req.body.number) {
            req.body.product.number = req.body.number;
        }
        next();
    } else {
        return res.json({
            success: false,
            result: "Dữ liệu gửi lên còn thiếu",
        });
    }
};
export const mUpdate = (req, res, next) => {
    if (req.body.type || req.body.size || req.body.money || req.body.number || req.body.ID) {
        req.body.update = {}
        if (req.body.money) {
            req.body.update.money = req.body.money;
        }
        if (req.body.number) {
            req.body.update.number = req.body.number;
        }
        if (req.body.type) {
            req.body.update.type = req.body.type;
        }
        if (req.body.size) {
            req.body.update.size = req.body.size;
        }
        if (req.body.ID) {
            req.body.update.ID = req.body.ID;
        }
        next();
    } else {
        return res.json({
            success: false,
            result: "Dữ liệu gửi lên còn thiếu",
        });
    }
};