import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const voucherSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  percent: { type: Number, min: 1, max: 100 },
  money: { type: Number, min: 1000 },
  conditionTotal: { type: Number, min: 0, default: 0 },
  description: { type: String, maxLength: 500 },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
  time: Date,
});
voucherSchema.plugin(mongoosePaginate);
const Voucher = mongoose.model("Voucher", voucherSchema);
Voucher.createCollection();
export default Voucher;
