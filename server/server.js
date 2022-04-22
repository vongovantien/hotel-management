const express = require("express");
const upload = require("./config/Multer");
const dotenv = require("dotenv");
const cloudinary = require("./config/Cloudinary");
const bodyParser = require("body-parser");
const connectDatabase = require("./config/MongoDb.js");
const ImportData = require("./DataImport.js");
const productRoute = require("./routes/ProductRouter.js");
const { errorHandler, notFound } = require("./middleware/Errors.js");
const userRoute = require("./routes/UserRouter");

dotenv.config();
connectDatabase();
const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

// app.use(cors())
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

// app.use("/upload-images", upload.array("image"), async (req, res) => {
//     try {
//         let pictureFiles = req.files;
//         console.log(req.files.image);
//         //Check if files exist
//         if (!pictureFiles)
//             return res.status(400).json({ message: "No picture attached!" });
//         //map through images and create a promise array using cloudinary upload function
//         let multiplePicturePromise = pictureFiles.map((picture) =>
//             cloudinary.v2.uploader.upload(pictureFiles.tempFilePath)
//         );
//         let imageResponses = await Promise.all(multiplePicturePromise);
//         res.status(200).json({ images: imageResponses });
//     } catch (err) {
//         res.status(500).json({
//             message: err.message,
//         });
//     }
// });

app.use("/uploads", upload.single("image"), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        res.json(result);
    } catch (err) {
        console.log(err);
    }
});
app.use(notFound);
app.use(errorHandler);
app.get("/", (req, res) => {
    res.json(products);
});

const PORT = process.env.PORT || 1000;

app.listen(5000, console.log(`server running in ${PORT}`));
