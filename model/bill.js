import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const billSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    customer: {
        type: String,
        maxLength: 100,
    },
    voucher: { type: mongoose.Schema.Types.ObjectId, ref: "Voucher" },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
    product: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        number: { type: Number, min: 1 },
    }, ],
    total: { type: Number, min: 1000 },
}, { timestamps: true });
billSchema.plugin(mongoosePaginate);
const Bill = mongoose.model("Bill", billSchema);
Bill.createCollection();
export default Bill;