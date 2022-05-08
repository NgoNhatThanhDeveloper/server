import Account from "../../model/account.js";
import Salary from "../../model/salary.js";
import Shop from "../../model/shop.js";
import Promise from "bluebird";
import Image from "../../model/image.js";
import mongoose from "mongoose";
export const createHR = (accountJson, files) => {
  accountJson._id = mongoose.Types.ObjectId();
  return new Promise((resolve, reject) => {
    const account = new Account(accountJson);
    const user = new Account(account);
    if (files.front.length > 0) {
      const front = new Image({
        _id: mongoose.Types.ObjectId(),
        data: files.front[0].buffer,
        contentType: files.front[0].mimeType,
        object: account._id,
      });
      front.save();
      account.information.cardID.front = front;
    }
    if (files.back.length > 0) {
      const back = new Image({
        _id: mongoose.Types.ObjectId(),
        data: files.back[0].buffer,
        contentType: files.back[0].mimeType,
        object: account._id,
      });
      back.save();
      account.information.cardID.back = back._id;
    }
    if (files.avatar.length > 0) {
      const avatar = new Image({
        _id: mongoose.Types.ObjectId(),
        data: files.avatar[0].buffer,
        contentType: files.avatar[0].mimeType,
        object: account._id,
      });
      avatar.save();
      account.information.avatar = avatar._id;
    }
    account
      .save()
      .then(() => {
        const salary = new Salary({ _id: account._id });
        return salary.save();
      })
      .then(() => {
        resolve({
          account: accountJson.account,
          password: accountJson.password,
          email: accountJson.authenticator.email,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const createSHOP = (shopJson, files) => {
  shopJson._id = mongoose.Types.ObjectId();
  return new Promise((resolve, reject) => {
    Shop.findOne({ name: shopJson.name, address: shopJson.address })
      .exec()
      .then((shop) => {
        if (shop) {
          reject(new Error(`Cửa hàng đã tồn tại`));
        } else {
          let promise_image = files.map((file) => {
            return new Promise((resolve) => {
              const image = new Image({
                _id: mongoose.Types.ObjectId(),
                data: file.buffer,
                contentType: file.mineType,
                object: shopJson._id,
                shop: shopJson._id._id,
              });
              image
                .save()
                .then(() => {
                  resolve(image._id);
                })
                .catch((err) => {
                  reject(err);
                });
            });
          });
          return Promise.all(promise_image);
        }
      })
      .then((image) => {
        const shop_new = new Shop(shopJson);
        shop_new.image = image;
        return shop_new.save();
      })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.log(error);
        if (error.message != "Cửa hàng đã tồn tại") {
          reject(new Error("Đã có lỗi phát sinh"));
        } else {
          reject(error);
        }
      });
  });
};
export const replaceHR = (shop_id, HR_replace_id) => {
  const promiseShop = Shop.findOne({ _id: shop_id }).exec();
  const promiseHR = Account.findOne({ _id: HR_replace_id }).exec();
  return new Promise((resolve, reject) => {
    Promise.all([promiseShop, promiseHR])
      .then((result) => {
        const shop = result[0];
        const HR = result[1];
        if (shop && HR) {
          if (HR.permission == "ceo") {
            reject(new Error("Bạn không thể đề cửa một CEO khác làm việc này"));
          } else {
            return new Promise((resolve) => {
              const promiseSaveShop = Shop.updateOne(
                { _id: shop },
                {
                  $set: { HR: HR_replace_id },
                }
              ).exec();
              const promiseSaveHR = Account.updateOne(
                { _id: HR_replace_id },
                {
                  $set: { shop: shop_id, permission: "hr" },
                }
              ).exec();
              Promise.all([promiseSaveHR, promiseSaveShop]).then(() =>
                resolve({
                  email: HR.authenticator.email,
                  shop: {
                    name: shop.name,
                    address: shop.address,
                  },
                })
              );
            });
          }
        } else {
          reject(
            new Error(
              "Mã cửa hàng hoặc mã nhân viên sai không tồn tại,yêu cầu kiểm tra lại"
            )
          );
        }
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
import Product from "../../model/product.js";
export const removeSHOP = (shop_id) => {
  return new Promise((resolve, reject) => {
    Shop.findOne({ _id: shop_id })
      .exec()
      .then((shop) => {
        if (shop) {
          return Shop.deleteOne({ _id: shop_id }).exec();
        } else {
          reject(new Error("Mã cửa hàng cần xóa không tồn tại"));
        }
      })
      .then((deleteCount) => {
        if (deleteCount.deletedCount > 0) {
          return Image.deleteMany({ shop: shop_id }).exec();
        } else {
          reject(new Error("Xóa thất bại, đã có lỗi phát sinh"));
        }
      })
      .then(() => {
        return Product.deleteMany({ shop: shop_id }).exec();
      })
      .then(() => {
        return Account.updateMany(
          { shop: shop_id },
          { $unset: { shop: "" } }
        ).exec();
      })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const removeHR = (HR_remove) => {
  return new Promise((resolve, reject) => {
    Account.findOne({ _id: HR_remove, permission: "hr" })
      .exec()
      .then((account) => {
        if (account) {
          if (account.permission == "ceo") {
            reject(new Error("Bạn không có quyền xóa người này"));
          } else {
            return Account.deleteOne({ _id: HR_remove }).exec();
          }
        } else {
          reject(new Error("Mã nhân viên sai hoặc không tồn tại"));
        }
      })
      .then(() => {
        return Image.deleteMany({ object: HR_remove }).exec();
      })
      .then(() => {
        return Salary.deleteOne({ _id: HR_remove }).exec();
      })
      .then(() => {
        return Shop.updateMany(
          { HR: HR_remove },
          { $unset: { HR: "" } }
        ).exec();
      })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const updateSalaryOfHR = (HR_update, salary, bonus) => {
  return new Promise((resolve, reject) => {
    Account.findOne({ _id: HR_update, permission: "hr" })
      .exec()
      .then((account) => {
        if (account) {
          if (account.permission == "ceo") {
            reject(
              new Error("Bạn không có quyền thay đổi mức lương của người này")
            );
          } else {
            let update = {};
            if (salary) {
              update.salary = salary;
            }
            if (bonus) {
              update.bonus = bonus;
            }
            return Salary.updateOne(
              { _id: HR_update },
              {
                $set: update,
                upsert: true,
              }
            ).exec();
          }
        } else {
          reject(new Error("Mã nhân viên sai hoặc không tồn tại"));
        }
      })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const showHR = (query) => {
  return new Promise((resolve, reject) => {
    Account.find(query, "information")
      .populate({
        path: "shop",
        select: "name address phone",
      })
      .exec()
      .then((accounts) => {
        if (accounts.length > 0) {
          resolve(accounts);
        } else {
          reject(new Error("Nhân viên không tồn tại"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const showSHOP = (query) => {
  return new Promise((resolve, reject) => {
    Shop.find(query, "name HR address phone")
      .populate({ path: "HR", select: "information" })
      .exec()
      .then((shops) => {
        if (shops.length > 0) {
          resolve(shops);
        } else {
          reject(new Error("Cửa hàng không tồn tại"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
