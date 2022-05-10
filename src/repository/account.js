import Account from "../../model/account.js";
import Promise from "bluebird";
import Image from "../../model/image.js";
import mongoose from "mongoose";
import * as code from "../../utils/generate.js";
export const updateAvatar = (account_id, file) => {
  return new Promise((resolve, reject) => {
    Account.findOne({ _id: account_id })
      .exec()
      .then((account) => {
        if (account) {
          return Image.deleteOne({ _id: account.information.avatar });
        } else {
          reject(new Error("Tài khoản này không tồn tại"));
        }
      })
      .then(() => {
        const avatar = new Image({
          _id: mongoose.Types.ObjectId(),
          data: file.buffer,
          contentType: file.mimetype,
          object: account_id,
        });
        return new Promise((resolve) => {
          avatar.save().then(() => {
            resolve(avatar._id);
          });
        });
      })
      .then((avatar) => {
        return Account.updateOne(
          { _id: account_id },
          { $set: { "information.avatar": avatar } }
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
export const showInformation = (account_id) => {
  return new Promise((resolve, reject) => {
    Account.findOne(
      { _id: account_id },
      "-password -createdAt -updatedAt -refreshToken -loginStatus -account"
    )
      .populate({
        path: "shop",
        select: "name phone address image HR",
        populate: { path: "HR", select: "information.name" },
      })
      .exec()
      .then((account) => {
        if (account) {
          const result = {
            information: {
              _id: "6276c453e09736acf758a0a6",
              permission: "sales manager",
              email: "nhatthanhdev200320@gmail.com",
              code: "035211559857",
              front: "6276c453e09736acf758a0a7",
              back: "6276c453e09736acf758a0a8",
              name: "NGÔ BẢO NGỌC",
              address: "NAM HƯNG-TIỀN HẢI-THÁI BÌNH",
              phone: "0388279927",
              avatar: "6276c453e09736acf758a0a9",
            },
            shop: {
              _id: "62771e8fb022d5da1121dd8e",
              name: "NGÔ BẢO NGỌC",
              address: "NAM HƯNG-TIỀN HẢI-THÁI BÌNH",
              image: [
                "62771e8fb022d5da1121dd90",
                "62771e8fb022d5da1121dd91",
                "62771e8fb022d5da1121dd92",
                "62771e8fb022d5da1121dd93",
                "62771e8fb022d5da1121dd94",
              ],
              phone: "0388279925",
              boss: "NGÔ BẢO NGỌC",
            },
          };
          resolve(account);
        } else {
          reject(new Error("Tài khoản không tồn tại"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const requestEmail = (account_id) => {
  return new Promise((resolve, reject) => {
    Account.findOne({ _id: account_id })
      .exec()
      .then((account) => {
        if (account) {
          const email_code = code.createCodeNumber();
          const time = Date.now() + 300000;
          account.authenticator.code.value = email_code;
          account.authenticator.code.time = time;
          return new Promise((resolve) => {
            account.save().then(() => {
              resolve({
                code: email_code,
                email: account.authenticator.email,
                time: new Date(time),
              });
            });
          });
        } else {
          reject(new Error("Tài khoản không tồn tại"));
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
export const confirmEmail = (account_id, value) => {
  return new Promise((resolve, reject) => {
    Account.findOne(account_id)
      .exec()
      .then((account) => {
        if (account) {
          if (account.authenticator.code.value == value) {
            if (account.authenticator.code.time >= Date.now()) {
              account.authenticator.code = null;
              account.authenticator.email = null;
              return account.save();
            } else {
              reject(new Error("Mã xác thực đã hết hạn"));
            }
          } else {
            reject(new Error("Mã xác thực không chính xác"));
          }
          return new Promise((resolve) => {
            account.save().then(() => {
              resolve({ code: email_code, email: account.authenticator.email });
            });
          });
        } else {
          reject(new Error("Tài khoản không tồn tại"));
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
export const replaceEmail = (account_id, email_replace) => {
  Account.findOne({ _id: account_id })
    .exec()
    .then((account) => {
      if (account) {
        if (account.authenticator.email === null) {
          account.authenticator.email = email_replace;
          return account.save();
        } else {
          reject(
            new Error(
              "Bạn phải tiến hành xác thực email cũ trước khi muốn thay thế bằng email hiện tại"
            )
          );
        }
      } else {
        reject(new Error("Tài khoản này không tồn tại"));
      }
    });
};
export const updateInformation = (account_id, update) => {
  return new Promise((resolve, reject) => {
    Account.findOne({ _id: account_id })
      .exec()
      .then((account) => {
        if (account) {
          if (update.address) {
            account.information.address = update.address;
          }
          if (update.phone) {
            account.information.phone = update.phone;
          }
          return account.save();
        } else {
          reject(new Error("Tài khoản này không tồn tại"));
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
