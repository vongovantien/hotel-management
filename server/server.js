const express = require("express");
// const upload = require("./config/Multer");
const dotenv = require("dotenv");
const cloudinary = require("./config/Cloudinary");
const multer = require("multer");
const bodyParser = require("body-parser");
const connectDatabase = require("./config/MongoDb.js");
const ImportData = require("./DataImport.js");
const { errorHandler, notFound } = require("./middleware/Errors.js");
const productRouter = require("./routes/ProductRouter.js");
const userRouter = require("./routes/UserRouter");
const categoryRouter = require("./routes/CategoryRouter");
const orderRouter = require("./routes/OrderRouter");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

let myUrl;
if (process.env.NODE_ENV === "development") myUrl = "http://localhost:5000";
else myUrl = "https://saleapp-backend.herokuapp.com/";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Demo xây dựng của hàng tạp hóa",
      version: "1.0.0",
      description: "Coding by VNVT",
    },
    servers: [
      {
        url: myUrl,
      },
    ],
    host: "https://saleapp-backend.herokuapp.com/",

    components: {
      securitySchemes: {
        Bearer: {
          type: "apiKey",
          name: "Authentication",
          scheme: "bearer",
          in: "header",
        },
      },
    },
    security: [
      {
        Bearer: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJSDoc(options);

dotenv.config();
connectDatabase();
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.redirect("/swagger");
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/swagger/", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/api/import", ImportData);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", orderRouter);

// function apiResponse(results){
//     return JSON.stringify({"status": 200, "error": null, "response": results});
// }

// app.post("/api/image-upload", upload.single("image"), (req, res) => {
//     const image = req.image;
//     res.send(apiResponse({ message: "File uploaded successfully.", image }));
// });

app.use(notFound);
app.use(errorHandler);

app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), () =>
  console.log(`Node server listening on port ${app.get("port")}!`)
);
