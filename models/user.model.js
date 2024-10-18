const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    }
}, {timestamps: true});

const userModel = db.model('user', userSchema);

module.exports = userModel;
