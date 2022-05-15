import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import * as validate from "../validate/validate.js";
const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ID: {
        type: String,
        uppercase: true,
        validate: {
            validator: (input) => {
                return validate.validateString(input);
            },
            message: (props) => `${props.value} invalid !`,
        },
    },
    type: {
        type: String,
        validate: {
            validator: (input) => {
                return validate.validateString(input);
            },
            message: (props) => `${props.value} invalid !`,
        },
    },
    size: {
        type: String,
        validate: {
            validator: (input) => {
                return validate.validateString(input);
            },
            message: (props) => `${props.value} invalid !`,
        },
    },
    money: {
        type: Number,
        min: 1000,
    },
    number: { type: Number, min: 0 },
    image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
});
productSchema.plugin(mongoosePaginate);
const Product = mongoose.model("Product", productSchema);
Product.createCollection();
export default Product;