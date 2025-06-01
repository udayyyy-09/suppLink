const mongoose = require('mongoose');
//below we have define a mongose db structure what content in it
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['vendor', 'admin'], default: 'vendor' },
    companyName: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);