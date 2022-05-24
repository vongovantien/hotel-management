const express = require("express");
// const upload = require("./config/Multer");
const dotenv = require("dotenv");
const cloudinary = require("./config/Cloudinary");
const multer = require("multer");
const bodyParser = require("body-parser");
const connectDatabase = require("./config/MongoDb.js");
const ImportData = require("./DataImport.js");
const { errorHandler, notFound } = require("./middleware/Errors.js");
const productRoute = require("./routes/ProductRouter.js");
const userRoute = require("./routes/UserRouter");
const categoryRoute = require("./routes/CategoryRouter");
const orderRoute = require("./routes/OrderRouter");
const cors = require("cors");
dotenv.config();
connectDatabase();
const app = express();
app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

// app.use(cors())
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/orders", orderRoute);

// function apiResponse(results){
//     return JSON.stringify({"status": 200, "error": null, "response": results});
// }

// app.post("/api/image-upload", upload.single("image"), (req, res) => {
//     const image = req.image;
//     res.send(apiResponse({ message: "File uploaded successfully.", image }));
// });

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(5000, console.log(`server running in ${PORT}`));
