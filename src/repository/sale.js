import Bill from "../../model/bill.js";
import Product from "../../model/product.js";
import Promise from "bluebird";
import mongoose from "mongoose";
export const createBill = (bill) => {
    bill._id = mongoose.Types.ObjectId();
    return new Promise(function(resolve, reject) {
        const products = bill.product.map((product) => {
            return product._id;
        });
        Product.find({ _id: { $in: products } }, "_id money")
            .exec()
            .then((products) => {
                let total = 0;
                products.forEach((product) => {
                    bill.product.forEach((product_in_bill) => {
                        if (product._id == product_in_bill._id) {
                            total += product.money * product_in_bill.number;
                        }
                    });
                });
                return totalAfterUseVoucher(bill.voucher, total, bill.shop);
            })
            .then((total) => {
                bill.total = total;
                const billNew = new Bill(bill);
                return new Promise((resolve) => {
                    billNew.save().then(() => {
                        resolve(bill);
                    });
                });
            })
            .then((bill) => {
                resolve(bill);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};
import Payment from "../../model/payment.js";
import Customer from "../../model/customer.js";
import Image from "../../model/image.js";
const saveImage = (file, object) => {
    return new Promise((resolve, reject) => {
        const image = new Image({
            _id: mongoose.Types.ObjectId(),
            data: file.buffer,
            contentType: file.mimeType,
            object: object,
        });
        image
            .save()
            .then(() => {
                resolve(image._id);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
export const createCustomer = (customerJson, files) => {
    customerJson._id = mongoose.Types.ObjectId();
    return new Promise((resolve, reject) => {
        Customer.findOne({
                name: customerJson.name,
                "cardID.code": customerJson.cardID.code,
            })
            .exec()
            .then((customer) => {
                if (customer) {
                    reject(
                        new Error(
                            `Khách hàng ${customer.name} đã có trong sổ khách hàng với mã số ${customer._id}`
                        )
                    );
                } else {
                    return Promise.all([
                        saveImage(files.front[0], customerJson._id),
                        saveImage(files.back[0], customerJson._id),
                        saveImage(files.avatar[0], customerJson._id),
                    ]);
                }
            })
            .then((image) => {
                const customerNew = new Customer(customerJson);
                customerNew.cardID.front = image[0];
                customerNew.cardID.back = image[1];
                customerNew.avatar = image[2];
                return customerNew.save();
            })
            .then(() => {
                const payment = new Payment({
                    _id: customerJson._id,
                    shop: customerJson.shop,
                });
                payment.total = [{ date: new Date(), total: 0 }];
                payment.paid = [{ date: new Date(), paid: 0 }];
                return payment.save();
            })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};
export const removeBill = (bill_id, shop_id) => {
    return new Promise((resolve, reject) => {
        Bill.deleteOne({ _id: bill_id, shop: shop_id })
            .exec()
            .then((docs) => {
                if (docs.deletedCount > 0) {
                    resolve();
                } else {
                    reject(new Error("Không tìm thấy tài liệu thích hợp để xóa"));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};
export const updateVoucherOfBill = (bill_id, shop, voucher_id) => {
    return new Promise((resolve, reject) => {
        Bill.findOne({ _id: bill_id, shop: shop })
            .exec()
            .then((bill) => {
                if (bill) {
                    return new Promise((resolve) => {
                        totalAfterUseVoucher(voucher_id, bill.total, bil.shop).then(
                            (total) => {
                                bill.voucher = voucher_id;
                                bill.total = total;
                                resolve(bill);
                            }
                        );
                    });
                } else {
                    reject(new Error(`Mã hóa đơn không tồn tại `));
                }
            })
            .then((bill) => {
                return new Promise((resolve) => {
                    bill.save().then(() => resolve(bill));
                });
            })
            .then((bill) => {
                resolve(bill);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
export const showBill = (query) => {
    return new Promise((resolve, reject) => {
        Bill.find(query)
            .populate({ path: "product._id", select: "image" })
            .exec()
            .then((bills) => {
                if (bills.length > 0) {
                    const result = bills.map((bill) => {
                        const products = bill.product.map((product) => {
                            return {
                                _id: product._id._id,
                                image: product._id.image,
                                money: product.money,
                                number: product.number,
                            };
                        });
                        return {
                            _id: bill._id,
                            customer: bill.customer,
                            total: bill.total,
                            createdAt: bill.createdAt,
                            product: products,
                        };
                    });
                    resolve(result);
                } else {
                    reject(new Error(`Không tìm thấy hóa đơn nào`));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};
import Voucher from "../../model/voucher.js";
export const createVoucher = (voucher) => {
    return new Promise((resolve, reject) => {
        voucher._id = mongoose.Types.ObjectId();
        let voucherNew = new Voucher(voucher);
        voucherNew
            .save()
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};
export const removeVoucher = (voucher_id, shop_id) => {
    return new Promise((resolve, reject) => {
        Voucher.deleteOne({ _id: voucher_id, shop: shop_id })
            .exec()
            .then((docs) => {
                if (docs.deletedCount > 0) {
                    resolve();
                } else {
                    reject(new Error("Đã có lỗi phát sinh hoặc sai mã số voucher"));
                }
            })
            .catch((err) => reject(err));
    });
};
export const showVoucher = (query) => {
    return new Promise((resolve, reject) => {
        Voucher.find(query)
            .exec()
            .then((voucher) => {
                if (voucher.length > 0) {
                    resolve(voucher);
                } else {
                    reject(new Error("Không tìm thấy voucher nào"));
                }
            })
            .catch((err) => reject(err));
    });
};
export const updatePayment = (customer_id, shop, total_add, paid_add) => {
    return new Promise((resolve, reject) => {
        Payment.findOne({ _id: customer_id, shop: shop })
            .exec()
            .then((payment) => {
                if (payment) {
                    if (total_add) {
                        payment.total.push({
                            date: new Date(),
                            total: total_add,
                        });
                    }
                    if (paid_add) {
                        payment.paid.push({
                            date: new Date(),
                            paid: paid_add,
                        });
                    }
                    return payment.save();
                } else {
                    reject(new Error(`Không tìm thấy sổ ghi nợ`));
                }
            })
            .then(() => {
                resolve();
            })
            .catch((error) => reject(error));
    });
};

function sumArray(arr) {
    let sum = 0;
    arr.forEach(function(value) {
        sum += value;
    });

    return sum;
}

export const showPayment = (query) => {
    return new Promise((resolve, reject) => {
        Payment.find(query)
            .populate({ path: "_id", select: "address avatar phone name" })
            .exec()
            .then((payments) => {
                if (payments.length > 0) {
                    const result = payments.map((pay) => {
                        return {
                            _id: pay._id._id,
                            name: pay._id.name,
                            phone: pay._id.phone,
                            avatar: pay._id.avatar,
                            total: sumArray(pay.total.map((pay) => pay.total)),
                            paid: sumArray(pay.paid.map((pay) => pay.paid)),
                        };
                    });
                    resolve(result);
                } else {
                    reject(new Error("Không tìm thấy sổ ghi nợ"));
                }
            })
            .catch((error) => reject(error));
    });
};
const totalAfterUseVoucher = (voucher, total, shop) => {
    return new Promise((resolve, reject) => {
        if (voucher == undefined) {
            resolve(total);
        } else {
            Voucher.findOne({ _id: voucher })
                .exec()
                .then((voucher) => {
                    if (voucher) {
                        return new Promise((resolve, reject) => {
                            if (voucher && voucher.shop.toString() === shop.toString()) {
                                resolve(voucher);
                            } else {
                                reject(
                                    new Error("Voucher không áp dụng được trong cửa hàng này")
                                );
                            }
                        });
                    } else {
                        reject(new Error("Voucher này không tồn tại"));
                    }
                })
                .then((voucher) => {
                    return new Promise((resolve, reject) => {
                        if (new Date(voucher.time).getTime() >= Date.now()) {
                            resolve(voucher);
                        } else {
                            reject(new Error("Voucher đã hết hạn khuyến mãi"));
                        }
                    });
                })
                .then((voucher) => {
                    return new Promise((resolve, reject) => {
                        if (voucher.conditionTotal <= total) {
                            resolve(voucher);
                        } else {
                            reject(new Error("Không thỏa mãn điều kiện áp dụng"));
                        }
                    });
                })
                .then((voucher) => {
                    return new Promise((resolve) => {
                        if (voucher.percent) {
                            resolve(total - (total / 100) * voucher.percent);
                        } else {
                            let totalNew = total - voucher.money;
                            if (total > 0) {
                                resolve(totalNew);
                            } else {
                                resolve(0);
                            }
                        }
                    });
                })
                .then((total) => {
                    resolve(total);
                })
                .catch((error) => {
                    reject(error);
                });
        }
    });
};
export const showCustomer = (id, shop) => {
    return new Promise((resolve, reject) => {
        Customer.findOne({ _id: id, shop: shop })
            .exec()
            .then((result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(new Error("Chưa có dữ liệu"));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};