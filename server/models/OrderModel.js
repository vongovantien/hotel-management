const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
