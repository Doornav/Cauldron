const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const accountSchema = new Schema({
    accountId: {
        type: String,
        required: true,
    },
    institutionName: {
        type: String,
    },
    accountType: {
        type: String,
    },
    balance: {
        type: Number,
    }
});



module.exports = accountSchema;
