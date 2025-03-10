const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    vendorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Vendor' },
    products: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
    totalAmount: { type: Number, required: true },
    deliveryDate: { type: Date, required: true },
    status: { type: String, default: 'pending' }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
