import mongoose from "mongoose";
const connectToMongodb = async (req, res) => {
  try {
    await mongoose.connect(process.env.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    return res.status(500).send(`Database error : ${err.message}`);
  }
};
export default connectToMongodb;
