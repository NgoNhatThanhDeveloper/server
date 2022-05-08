import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const salarySchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  salary: { type: Number, min: 0, default: 0 },
  bonus: { type: Number, min: 0, default: 0 },
});
salarySchema.plugin(mongoosePaginate);
const Salary = mongoose.model("Salary", salarySchema);
Salary.createCollection();
export default Salary;
