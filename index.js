import express from "express";
const app = express();
import bodyParser from "body-parser";
import Image from "./model/image.js";
import routerApp from "./src/router/index.js";
import dotenv from "dotenv";
dotenv.config();
import connectToMongodb from "./config/mongo.js";
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/v1/",function(req, res,next){
  console.log(req.body);
  console.log(req.params);
  console.log(req.query);
  console.log(req.files);
  next()
}, routerApp);
app.get("/",(req, res)=>{
  res.send("website action........................")
})
app.get("/image/:id", (req, res) => {
  Image.findOne({ _id: req.params.id })
    .exec()
    .then((image) => {
      if (image) {
        const buffer = image.data;
        const contentType = image.contentType;
        res.contentType(contentType || "image/png");
        res.send(buffer);
      } else {
        res.status(403).send("Image not exist !");
      }
    })
    .catch((err) => {
      res.status(403).send(err.message);
    });
});
app.listen(process.env.PORT, (req, res) => {
  connectToMongodb(req, res);
});
