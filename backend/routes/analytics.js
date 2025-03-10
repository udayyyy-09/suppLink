const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middlewares/auth');

// Get dashboard analytics
router.get('/dashboard', auth, async (req, res) => {
    try {
        const today = new Date();
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        // Get revenue analytics
        const revenueData = await Order.aggregate([
            {
                $match: {
                    vendorId: req.user.userId,
                    createdAt: { $gte: lastWeek }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalRevenue: { $sum: "$totalAmount" }
                }
            }
        ]);

        // Get order time distribution
        const orderTimeDistribution = await Order.aggregate([
            {
                $match: { vendorId: req.user.userId }
            },
            {
                $group: {
                    _id: {
                        $hour: "$createdAt"
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        // Most ordered products
        const popularProducts = await Order.aggregate([
            { $unwind: "$products" },
            {
                $group: {
                    _id: "$products.productId",
                    totalOrders: { $sum: 1 }
                }
            },
            { $sort: { totalOrders: -1 } },
            { $limit: 5 }
        ]);

        res.json({
            revenue: revenueData,
            orderTimes: orderTimeDistribution,
            popularProducts
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});