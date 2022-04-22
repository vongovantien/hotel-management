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
