const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middlewares/auth');  // Use consistent path

router.post('/add', auth, async (req, res) => {
    try {
        const { category, itemName, quantity, costPerUnit } = req.body;
        const product = new Product({
            category,
            itemName,
            quantity,
            costPerUnit,
            vendorId: req.user.userId
        });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/products', auth, async (req, res) => {
    try {
        const products = await Product.find({ vendorId: req.user.userId });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 