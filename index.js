import express from "express";
import http from "http";
import Image from "./model/image.js";
import router from "./src/router/index.js";
import dotenv from "dotenv";
import connectToMongodb from "./config/mongo.js";

dotenv.config();
const app = express();
const server = http.createServer(app);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", function(req, res) {
    return res.send("helloooooooooooooooooo");
});
app.use(
    "/api/v1/",
    function(req, res, next) {
        console.log(req.body);
        console.log(req.params);
        console.log(req.query);
        console.log(req.files)
        next()
    },
    router
);
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
server.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
    connectToMongodb()
        .then(() => {
            console.log("database connected");
        })
        .catch((err) => {
            console.error(err.message);
        });
});