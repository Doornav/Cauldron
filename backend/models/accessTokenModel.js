const mongoose = require('mongoose');
const accountSchema = require('./accountModel');
const InstitutionSchema = require('./instiutionModel');
const accessTokenSchema = new mongoose.Schema({
  token: { // Plaid access token
    type: String,
    required: true 
  }, 
  institution: {    // Institution name
    type: [InstitutionSchema],
    default: [],
  }, 
  accounts: {
    type: [accountSchema], // Embedded accounts
    default: [],
  },
});

module.exports = accessTokenSchema; // Export as a sub-schema
