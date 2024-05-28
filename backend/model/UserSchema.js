const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneno: {
        type: Number,
        unique: true,
        required: true,
    }
});

module.exports = mongoose.model('User' , User);