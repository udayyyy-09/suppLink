const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middlewares/auth');

// Update delivery location
router.post('/:orderId/location', auth, async (req, res) => {
    try {
        const { latitude, longitude, status } = req.body;
        const order = await Order.findOneAndUpdate(
            { _id: req.params.orderId },
            {
                currentLocation: { latitude, longitude },
                status
            },
            { new: true }
        );
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get delivery status
router.get('/:orderId/status', auth, async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.orderId });
        res.json({
            status: order.status,
            currentLocation: order.currentLocation,
            expectedDelivery: order.deliveryDate
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});