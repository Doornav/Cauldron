const mongoose = require('mongoose');

const BalanceHistorySchema = new mongoose.Schema({
  balance: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = BalanceHistorySchema;