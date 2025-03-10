const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: { type: String, required: true },
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    costPerUnit: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    originalPrice: { type: Number },
    image: { type: String },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Product', productSchema);