import Image from "../../model/image.js";
import Product from "../../model/product.js";
import Promise from "bluebird";
import mongoose from "mongoose";
export const createProduct = (request) => {
    return new Promise((resolve, reject) => {
        findProduct({ ID: request.product.ID, shop: request.product.shop })
            .then((product) => {
                reject(
                    new Error(
                        `Sản phẩm ${product.ID} đã tồn tại trong cửa hàng ${product.shop}`
                    )
                );
            })
            .catch((err) => {
                if (err.message == "Sản phẩm không tồn tại") {
                    request.product._id = mongoose.Types.ObjectId();
                    const product = new Product(request.product);
                    const file = request.file;
                    const image = new Image({
                        _id: mongoose.Types.ObjectId(),
                        data: file.buffer,
                        contentType: file.mineType,
                        object: product._id,
                        shop: product.shop,
                    });
                    image.save();
                    product.image = image._id;
                    product
                        .save()
                        .then(() => {
                            resolve();
                        })
                        .catch((err) => {
                            reject(err);
                        });
                }
            });
    });
};
export const updateProduct = (request) => {
    return new Promise((resolve, reject) => {
        Product.updateOne({ _id: request._id, shop: request.shop }, { $set: request.update })
            .exec()
            .then((docs) => {
                if (docs.acknowledged) {
                    resolve();
                } else {
                    reject(new Error("Cập nhật thất bại"));
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};
export const updateImageProduct = (request) => {
    return new Promise((resolve, reject) => {
        findProduct({ _id: request_id, shop: request.shop })
            .then(async(product) => {
                const file = request.file;
                const image = new Image({
                    _id: mongoose.Types.ObjectId(),
                    data: file.buffer,
                    contentType: file.mineType,
                    object: product._id,
                    shop: product.shop,
                });
                await image.save();
                await Image.remove({ _id: product.image });
                product.image = image._id;
                return product.save();
            })
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};
export const removeProduct = (request) => {
    return new Promise((resolve, reject) => {
        findProduct({ _id: request._id, shop: request.shop })
            .then((product) => {
                return Image.deleteOne({ _id: product.image }).exec();
            })
            .then(() => {
                return Product.deleteOne({ _id: request._id }).exec();
            })
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};
export const showProduct = (request) => {
    return new Promise((resolve, reject) => {
        Product.find(request.query)
            .exec()
            .then((products) => {
                if (products.length > 0) {
                    resolve(products);
                } else {
                    reject(new Error("Sản phẩm không tồn tại"));
                }
            })
            .catch((err) => reject(err));
    });
};
const findProduct = (request) => {
    return new Promise((resolve, reject) => {
        Product.findOne(request)
            .exec()
            .then((product) => {
                if (product) {
                    resolve(product);
                } else {
                    reject(new Error("Sản phẩm không tồn tại"));
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};