<<<<<<< HEAD
import mongoose  from "mongoose";

const connectDatabase = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log("Mongo connected")
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

export default connectDatabase;
=======
const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongo connected");
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

module.exports = connectDatabase;
>>>>>>> main
