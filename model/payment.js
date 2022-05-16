import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const paymentSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
    total: [{ date: Date, total: { type: Number, min: 0 } }],
    paid: [{ date: Date, paid: { type: Number, min: 0 } }],
});
paymentSchema.plugin(mongoosePaginate);
const Payment = mongoose.model("Payment", paymentSchema);
Payment.createCollection();
export default Payment;