import mongoose from "mongoose";
export default function connectToMongodb() {
  return mongoose.connect(process.env.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
