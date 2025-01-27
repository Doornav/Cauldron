const mongoose = require('mongoose');

const holdingSchema = new mongoose.Schema({
  securityId: { 
    type: String, 
    required: true
  }, // Unique ID from Plaid
  symbol: { 
    type: String
  },
  name: { 
    type: String
  },
  quantity: {
    type: Number, 
    required: true 
  },
  currentPrice: { 
    type: Number 
  },
  marketValue: { 
    type: Number
  },
  isoCurrencyCode: { 
    type: String
  },
});

module.exports = holdingSchema; // Export as a sub-schema
