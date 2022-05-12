import Bill from "../../model/bill.js";
import Product from "../../model/product.js";
import Promise from "bluebird";
import mongoose from "mongoose";
export const createBill = (bill) => {
  bill._id = mongoose.Types.ObjectId();
  return new Promise(function (resolve, reject) {
    const products = bill.product.map((product) => {
      return product._id;
    });
    Product.find({ _id: { $in: products } }, "_id money")
      .exec()
      .then((products) => {
        let total = 0;
        products.forEach((product) => {
          request.bill.product.forEach((product_in_bill) => {
            if (product._id == product_in_bill._id) {
              total += product.money * product_in_bill.number;
            }
          });
        });
        return totalAfterUseVoucher(bill.voucher, total, bill.shop);
      })
      .then((total) => {
        bill.total = total;
        const bill = new Bill(bill);
        return new Promise((resolve) => {
          bill.save().then(() => {
            resolve(bill);
          });
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
import Payment from "../../model/payment.js";
import Customer from "../../model/customer.js";
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
        resolve(image_id);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const createCustomer = (customer, files) => {
  customer._id = mongoose.Types.ObjectId();
  return new Promise((resolve, reject) => {
    Customer.findOne({
      name: customer.name,
      "cardID.code": customer.cardID.code,
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
            saveImage(files.front[0], customer._id),
            saveImage(files.back[0], customer._id),
            saveImage(files.avatar[0], customer._id),
          ]);
        }
      })
      .then((image) => {
        const customer = new Customer(customer);
        customer.cardID.front = image[0];
        customer.cardID.back = image[1];
        customer.cardID.avatar = image[2];
        return customer.save();
      })
      .then(() => {
        const payment = new Payment({ _id: customer._id });
        return payment.save();
      })
      .then(() => {
        resolve(customer._id);
      })
      .catch((error) => {
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
      .exec()
      .then((bills) => {
        if (bills.length > 0) {
          resolve(bills);
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
export const showPayment = (query) => {
  return new Promise((resolve, reject) => {
    Payment.find(query)
      .populate({path : "_id",select : "name avatar"})
      .exec()
      .then((payments) => {
        if (payments.length > 0) {
         const result =  payments.map(pay => {
            return {
              _id : pay._id._id,
              customer : pay._id.name,
              avatar : pay._id.avatar,
              total : pay.total, 
              paid : pay.paid
            }
          })
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
