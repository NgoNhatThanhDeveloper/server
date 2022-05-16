import mongoose from "mongoose";
import * as validate from "../validate/validate.js";
import mongoosePaginate from "mongoose-paginate-v2";
const customerSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: {
        type: String,
        required: true,
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
            maxlength: 13,
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
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
});
customerSchema.plugin(mongoosePaginate);
const Customer = mongoose.model("Customer", customerSchema);
Customer.createCollection();
export default Customer;