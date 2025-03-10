const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Create payment intent
router.post('/create-intent', auth, async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await Order.findOne({ _id: orderId });
        
        // Here you would integrate with a payment gateway like Stripe
        // This is a placeholder response
        res.json({
            clientSecret: 'dummy_client_secret',
            amount: order.totalAmount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Confirm payment
router.post('/confirm', auth, async (req, res) => {
    try {
        const { orderId, paymentIntentId } = req.body;
        const order = await Order.findOneAndUpdate(
            { _id: orderId },
            { 
                paymentStatus: 'paid',
                paymentId: paymentIntentId
            },
            { new: true }
        );
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});