const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  accountId: {
    type: String,
  },
  transactionId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: [String], // Transaction categories (e.g., ["Food", "Groceries"])
});

module.exports = transactionSchema;
