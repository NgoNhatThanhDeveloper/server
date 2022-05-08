import mongoose from "mongoose";
import * as validate from "../validate/validate.js";
import "mongoose-type-email";
import bcrypt from "bcrypt";
import mongoosePaginate from "mongoose-paginate-v2";
const accountSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: "Salary" },
  account: {
    type: String,
    unique: true,
    sparse: true,
    require: true,
    trim: true,
    validate: {
      validator: (input) => {
        return validate.validateString(input);
      },
      message: (props) => `${props.value} không hợp lệ !`,
    },
  },
  password: {
    type: String,
    trim: true,
    sparse: true,
    require: true,
    unique: true,
  },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
  authenticator: {
    email: {
      type: mongoose.SchemaTypes.Email,
      unique: true,
      sparse: true,
      require: true,
      trim: true,
      validate: {
        validator: (input) => {
          return validate.validateEmail(input);
        },
        message: (props) => `${props.value} không hợp lệ !`,
      },
    },
    code: {
      time: { type: Number },
      value: { type: Number, min: 100000, max: 999999 },
    },
  },
  permission: {
    type: String,
    enum: [
      "ceo",
      "branch management",
      "hr",
      "product management",
      "sales manager",
    ],
    trim: true,
  },
  refreshToken: { type: String },
  loginStatus: { type: Boolean, default: false },
  information: {
    name: {
      type: String,
      uppercase: true,
      required: true,
      validate: {
        validator: (input) => {
          return validate.validateString(input);
        },
        message: (props) => `${props.value} không hợp lệ !`,
      },
    },
    address: {
      type: String,
      required: true,
      uppercase: true,
      maxlength: 500,
      validate: {
        validator: (input) => {
          return validate.validateString(input);
        },
        message: (props) => `${props.value} không hợp lệ !`,
      },
    },
    cardID: {
      code: {
        type: String,
        maxlength: 12,
        required: true,
        unique: true,
        validate: {
          validator: (input) => {
            return validate.validateCardNumber(input);
          },
          message: (props) => `${props.value} không hợp lệ !`,
        },
      },
      front: { type: mongoose.Schema.Types.ObjectId },
      back: { type: mongoose.Schema.Types.ObjectId },
    },
    avatar: { type: mongoose.Schema.Types.ObjectId },
    phone: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (input) => {
          return validate.validatePhone(input);
        },
        message: (props) => `${props.value} không hợp lệ !`,
      },
    },
  },
});
accountSchema.plugin(mongoosePaginate);
accountSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password")) {
    if (validate.validatePassword(user.password)) {
      return bcrypt
        .genSalt(Number(process.env.SALT_WORK_FACTOR))
        .then((salt) => {
          return bcrypt.hash(user.password, salt);
        })
        .then((hash) => {
          user.password = hash;
          next();
        });
    } else {
      next(new Error(`${user.password} không hợp lệ`));
    }
  } else {
    next();
  }
});
accountSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};
const Account = mongoose.model("Account", accountSchema);
Account.createCollection();

export default Account;
