import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const imageSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  data: mongoose.Schema.Types.Buffer,
  contentType: { type: String },
  object: { type: mongoose.Schema.Types.ObjectId },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
});
imageSchema.plugin(mongoosePaginate);
const Image = mongoose.model("Image", imageSchema);
Image.createCollection();
export default Image;
