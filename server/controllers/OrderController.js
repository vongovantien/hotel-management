const Order = require("../models/OrderModel");

getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );
        if (order) {
            res.json(order);
        } else {
            res.status(404);
            throw new Error("Order Not Found");
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

addOrder = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;
        if (orderItem && orderItems.length === 0) {
            res.status(400);
            throw new Error("No item to order");
        } else {
            const order = new Order({
                orderItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            });
        }
        await order.save().then(res.status(201).json(order));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        await order.remove();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getOrderById,
    deleteOrder,
    addOrder,
    getOrders,
};
