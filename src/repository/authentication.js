import Account from "../../model/account.js";
import Promise from "bluebird";
import * as jwt from "../../utils/jwt.js";
export const login = (request) => {
  return new Promise((resolve, reject) => {
    findAccount({ account: request.query.account })
      .then((account) => {
        const isMatch = account.comparePassword(request.query.password);
        if (isMatch) {
          const accessToken = jwt.generateAccessJWT({
            code: account._id,
            permission: account.permission,
            shop: account.shop,
          });
          const refreshToken = jwt.generateRefreshJWT({
            code: account._id,
            email: account.authenticator.email,
            secret: Date.now(),
          });
          account.refreshToken = refreshToken;
          account.loginStatus = true;
          return new Promise((resolve) => {
            account.save().then(() => {
              resolve({
                accessToken: accessToken,
                refreshToken: refreshToken,
              });
            });
          });
        } else {
          reject(new Error("Mật khẩu không chính xác"));
        }
      })
      .then((token) => {
        resolve(token);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const logout = (request) => {
  return new Promise((resolve, reject) => {
    findAccount({ _id: request._id })
      .then((account) => {
        account.loginStatus = false;
        account.refreshToken = null;
        return account.save();
      })
      .then(() => resolve())
      .catch((error) => {
        reject(error);
      });
  });
};
export const token = (request) => {
  return new Promise((resolve, reject) => {
    findAccount({ _id: request._id })
      .then((account) => {
        if (account.refreshToken == request.refreshToken) {
          resolve();
        } else {
          reject(new Error("Mã phiên xác thực không hợp lệ"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
import bcrypt from "bcrypt";
export const change = (request) => {
  return new Promise((resolve, reject) => {
    findAccount(request.query)
      .then((account) => {
        const isMatch = account.comparePassword(request.password);
        if (isMatch) {
          account.password = request.password_replace;
          return account.save();
        } else {
          reject(new Error(`Mật khẩu không chính xác`));
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

import * as code from "../../utils/generate.js";
export const missing = (request) => {
  return new Promise((resolve, reject) => {
    findAccount({
      account: request.account,
      "authenticator.email": request.email,
    })
      .then((account) => {
        const value = code.createCodeNumber();
        const time = Date.now() + 300000;
        account.authenticator.code.value = value;
        account.authenticator.code.time = time;
        account.loginStatus = false;
        account.refreshToken = null;
        return new Promise((resolve) => {
          account.save().then(() => {
            resolve({
              code: value,
              email: account.authenticator.email,
              time: time,
            });
          });
        });
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const confirm = (request) => {
  return new Promise((resolve, reject) => {
    findAccount({ account: request.account })
      .then((account) => {
        if (account.authenticator.code.value == request.code) {
          if (account.authenticator.code.time >= Date.now()) {
            const password_replace = code.createCodePassword();
            account.password = password_replace;
            account.authenticator.code.value = null;
            account.authenticator.code.time = null;
            return new Promise((resolve) => {
              account.save().then(() => {
                resolve({
                  email: account.authenticator.email,
                  password: password_replace,
                });
              });
            });
          } else {
            reject(new Error("Mã xác thực đã hết hạn"));
          }
        } else {
          reject(new Error("Mã xác thực không chính xác"));
        }
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const findAccount = (filter, select, options) => {
  return new Promise((resolve, reject) => {
    Account.findOne(filter, select, options)
      .exec()
      .then((account) => {
        if (account) {
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
