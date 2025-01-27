const mongoose = require('mongoose');
const accessTokenSchema = require('./accessTokenModel');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    lastPasswordChange: {
        type: Date,
        default: null,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lastNameChange: {
        type: Date, // Tracks the last time the name was changed
        default: null, // Null if the user hasn't changed their name yet
      },
    isVerified: {
        type: Boolean,
        default: false,
    },
    accessTokens: {
        type: [accessTokenSchema], // Embedded access tokens
        default: [],
      },
}, { timestamps: true });



module.exports = mongoose.model('User', userSchema);
