const mongoose = require('mongoose');

const aiLogSchema = new mongoose.Schema({
  module: { 
    type: String, 
    enum: ['CategoryGenerator', 'WhatsAppBot'],
    required: true 
  },
  prompt: { type: String, required: true },
  response: { type: mongoose.Schema.Types.Mixed, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AILog', aiLogSchema);