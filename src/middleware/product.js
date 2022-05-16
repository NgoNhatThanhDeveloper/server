export const mPermission = (req, res, next) => {
    if (
        req.body.payload.permission == "product management"
    ) {
        next();
    } else {
        return res.json({
            success: false,
            result: "Bạn không thể sử dụng chức năng này ",
        });
    }
};

export const mCreate = (req, res, next) => {
    if (req.body.ID && req.body.type && req.body.size) {
        req.body.product = {
            ID: req.body.ID.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
            type: req.body.type.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
            size: req.body.size.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
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
            req.body.update.type = req.body.type.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
        }
        if (req.body.size) {
            req.body.update.size = req.body.size.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
        }
        if (req.body.ID) {
            req.body.update.ID = req.body.ID.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
        }
        next();
    } else {
        return res.json({
            success: false,
            result: "Dữ liệu gửi lên còn thiếu",
        });
    }
};