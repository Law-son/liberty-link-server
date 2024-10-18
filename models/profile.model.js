const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const profileSchema = new Schema({
    userID: {
        type: String,
    },
    name: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    nationality: {
        type: String,
    },
    preferredLanguage: {
        type: String,
    },
    areasOfInterest: {
        type: [String],
    },
    id: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
}, {timestamps: true});

const profileModel = db.model('profile', profileSchema);

module.exports = profileModel;

