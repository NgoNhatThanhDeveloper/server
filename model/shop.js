import mongoose from "mongoose";
import * as validate from "../validate/validate.js";
import "mongoose-type-email";
import mongoosePaginate from "mongoose-paginate-v2";
const shopSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: {
        type: String,
        maxLength: 100,
        validate: {
            validator: (input) => {
                return validate.validateString(input);
            },
            message: (props) => `${props.value} không hợp lệ !`,
        },
    },
    HR: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
    },
    address: {
        type: String,
        maxLength: 500,
        validate: {
            validator: (input) => {
                return validate.validateString(input);
            },
            message: (props) => `${props.value} không hợp lệ !`,
        },
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
    },
    phone: {
        type: String,
        unique: true,
        validator: {
            validate: (input) => {
                return validate.validatePhone(input);
            },
            message: (props) => `${props.value} không hợp lệ !`,
        },
    },
});
shopSchema.plugin(mongoosePaginate);
const Shop = mongoose.model("Shop", shopSchema);
Shop.createCollection();
export default Shop;