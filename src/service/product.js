import * as repository from "../repository/product.js";
export const createProductService = (req, res) => {
    const request = {
        product: req.body.product,
        file: req.file,
    };
    repository
        .createProduct(request)
        .then(() => {
            return res

                .json({ success: true, result: "Yêu cầu thành công" });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};
export const updateProductService = (req, res) => {
    const request = {
        _id: req.params.id,
        shop: req.body.payload.shop,
        update: req.body.update,
    };
    repository
        .updateProduct(request)
        .then(() => {
            return res

                .json({ success: true, result: "Yêu cầu thành công" });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};
export const updateImageProductService = (req, res) => {
    const request = {
        _id: req.params.id,
        shop: req.body.payload.shop,
        file: req.file,
    };
    repository
        .updateImageProduct(request)
        .then(() => {
            return res

                .json({ success: true, result: "Yêu cầu thành công" });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};
export const removeProductService = (req, res) => {
    const request = {
        _id: req.params.id,
        shop: req.body.payload.shop,
    };
    repository
        .removeProduct(request)
        .then(() => {
            return res

                .json({ success: true, result: "Yêu cầu thành công" });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};
export const showProductService = (req, res) => {
    req.query.shop = req.body.payload.shop;
    const request = {
        query: req.query,
    };
    repository
        .showProduct(request)
        .then((product) => {
            return res

                .json({ success: true, result: "Yêu cầu thành công", data: product });
        })
        .catch((error) => {
            return res.json({ success: false, result: error.message });
        });
};