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
                    let product = new Product(request.product);
                    let imageArr = request.files.map((file) => {
                        let image = new Image({
                            _id: mongoose.Types.ObjectId(),
                            data: file.buffer,
                            contentType: file.mineType,
                            object: product._id,
                            shop: product.shop,
                        });
                        image.save();
                        return image._id;
                    });
                    product.images = imageArr;
                    product
                        .save()
                        .then(() => {
                            resolve();
                        })
                        .catch((err) => {
                            reject(err);
                        });
                } else {
                    reject(err);
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
            .then((product) => {
                if (product.images.length == 10) {
                    reject(new Error("Giới hạn 10 bức ảnh với 1 sản phẩm"));
                } else {
                    const arrRemove = request.files.splice(0, 10 - product.images.length);
                    let imageArr = arrRemove.map((file) => {
                        let image = new Image({
                            _id: mongoose.Types.ObjectId(),
                            data: file.buffer,
                            contentType: file.mineType,
                            object: product._id,
                            shop: product.shop,
                        });
                        image.save();
                        return image._id;
                    });
                    const imageUpdate = product.images.concat(imageArr);
                    product.images = imageUpdate;
                    return product.save();
                }
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
                return Image.deleteMany({ $in: product.images }).exec();
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