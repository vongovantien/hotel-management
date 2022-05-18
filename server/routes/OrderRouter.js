const express = require("express");
const asyncHandler = require("express-async-handler");
const orderController = require("../controllers/OrderController");
const orderRoute = express.Router();

orderRoute
    .route("/:id")
    .get(orderController.getOrderById)
    .delete(orderController.deleteOrder);


orderRoute
    .route("/")
    .get(orderController.getOrders)
    .post(orderController.addOrder);

module.exports = orderRoute;
