const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create a new order
router.post('/', async (req, res) => {
    try {
        const { products, totalAmount, deliveryDate } = req.body;
        const order = new Order({
            vendorId: req.user.userId,
            products,
            totalAmount,
            deliveryDate,
            status: 'pending'
        });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all orders for a vendor
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({ vendorId: req.user.userId })
            .populate('products.productId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update order status
router.patch('/:orderId/status', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findOneAndUpdate(
            { _id: req.params.orderId, vendorId: req.user.userId },
            { status },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;