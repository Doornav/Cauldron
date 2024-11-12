const mongoose = require('mongoose');
const accessTokenSchema = require('./accessTokenModel');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true, // Fixed typo
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true // Fixed typo
    },
    name: {
        type: String,
        required: true, // Fixed typo
        trim: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    accessTokens: [accessTokenSchema]
}, { timestamps: true });



module.exports = mongoose.model('User', userSchema);
