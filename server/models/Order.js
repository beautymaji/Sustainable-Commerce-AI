const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true, required: true },
  status: { type: String, required: true },
  estimatedDelivery: { type: String, required: true },
  items: [String]
});

module.exports = mongoose.model('Order', orderSchema);