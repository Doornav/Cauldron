const mongoose = require('mongoose');
const accountSchema = require('./accountModel');

const Schema = mongoose.Schema;

const accessTokenSchema = new Schema({
    accessToken: {
        type: String,
        required: true,
    },
    accounts: [accountSchema], // Array of accounts linked to this access token
    linkedAt: {
        type: Date,
        default: Date.now,
    }
});



module.exports = accessTokenSchema;