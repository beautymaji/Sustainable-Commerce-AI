const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  primaryCategory: { type: String, required: true },
  subCategory: { type: String, required: true },
  seoTags: [String],
  sustainabilityFilters: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);