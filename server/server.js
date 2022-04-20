import express from "express";
import dotenv from "dotenv"
import connectDatabase from "./config/MongoDb.js";

dotenv.config();
connectDatabase();
const app = express();
app.get("/", (req, res ) => {
    res.json(products)
})

const PORT = process.env.PORT || 1000;

app.listen(5000, console.log(`server running in ${PORT}`))