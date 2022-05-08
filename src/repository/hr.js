import Account from "../../model/account.js";
import Salary from "../../model/salary.js";
import Promise from "bluebird";
import mongoose from "mongoose";
import Image from "../../model/image.js";
export const createEmploy = (accountJson, salary_employ, files) => {
  accountJson._id = mongoose.Types.ObjectId();
  return new Promise((resolve, reject) => {
    Account.findOne({
      $or: [
        { account: accountJson.account },
        { "information.phone": accountJson.information.phone },
        {
          "information.cardID.code": accountJson.information.cardID.code,
        },
        { "authenticator.email": accountJson.authenticator.email },
      ],
    })
      .exec()
      .then((account) => {
        if (account) {
          reject(
            new Error(
              "Một số thông tin như số chứng minh,điện thoại ,email hoặc tài khoản đã được người khác sử dụng"
            )
          );
        } else {
          const account = new Account(accountJson);
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
            return account.save();
          }
        }
      })
      .then(() => {
        const salary = new Salary({
          _id: accountJson._id,
          salary: salary_employ,
        });
        return salary.save();
      })
      .then(() => {
        resolve(accountJson);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const updatePermissionOfEmploy = (request) => {
  return new Promise((resolve, reject) => {
    Account.findOne(request.query)
      .exec()
      .then((account) => {
        account.permission = request.permission;
        return new Promise((resolve) => {
          account.save().then(() => resolve(account.authenticator.email));
        });
      })
      .then((email) => {
        resolve(email);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const removeEmploy = (employ_id, shop_id) => {
  return new Promise((resolve, reject) => {
    Account.findOne({ _id: employ_id, shop: shop_id })
      .exec()
      .then((account) => {
        if (account) {
          if (account.permission == ("ceo", "hr")) {
            reject(
              new Error(
                "Không thể xóa tài khoản người có chức vụ ngang hoặc cao hơn bạn"
              )
            );
          } else {
            return Account.deleteOne({ _id: employ_id }).exec();
          }
        } else {
          reject(new Error("Nhân viên này không tồn tại"));
        }
      })
      .then(() => {
        return Image.deleteMany({ object: employ_id }).exec();
      })
      .then(() => {
        return Salary.deleteOne({ _id: employ_id }).exec();
      })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const updateSalaryOfEmploy = (request) => {
  return new Promise((resolve, reject) => {
    Account.findOne(request.query)
      .exec()
      .then((account) => {
        if (account) {
          if (account.permission == ("hr", "ceo")) {
            reject(new Error("Bạn không thể thay đổi mức lương người có chức vụ ngang hoặc cao hơn bạn"));
          } else {
            return Salary.updateOne(request.query, {
              $set: { salary: request.update },
              upsert: true,
            }).exec();
          }
        } else {
          reject(new Error("Nhân viên không tồn tại"));
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
export const showInformationEmploy = (query) => {
  return new Promise((resolve, reject) => {
    Account.find(
      query,
      "_id information permission shop loginStatus authenticator.email"
    )
      .populate({ path: "_id", select: " salary bonus " })
      .populate({ path: "shop", select: "name phone address " })
      .exec()
      .then((users) => {
        if (users.length > 0) {
          const arr = users.filter((user) => {
            if (user.permission == "ceo") {
              return false;
            } else {
              return true;
            }
          });
          resolve(arr);
        } else {
          reject(new Error("Nhân viên không tồn tại"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
