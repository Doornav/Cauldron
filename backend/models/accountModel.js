const mongoose = require('mongoose');
const transactionSchema = require('./transactionModel');
const holdingSchema = require('./holdingModel');
const BalanceHistorySchema = require('./balanceHistoryModel');

const accountSchema = new mongoose.Schema({
  accountId: { // Unique ID from Plaid
    type: String,

  }, 
  institution_id: { // Unique ID from Plaid
    type: String,
 
  },
  accountName: {
    type: String,
  },
  accountType: { // e.g., "checking", "investment"
    type: String,
    required: true
  }, 
  balance: { // Current balance
    type: Number
  }, 
  balanceHistory: {
    type: [BalanceHistorySchema],
    default: [],
  },
  transactions: {   // Embedded transactions
    type: [transactionSchema], 
    default: [],
  },
  holdings: {   // Embedded holdings
    type: [holdingSchema], 
    default: [],
  },
});

module.exports = accountSchema; // Export as a sub-schema
