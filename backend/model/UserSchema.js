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
    },
    profilepic:{
        type: String,
        default: "https://images.unsplash.com/profile-1645673990842-86a791fa5deaimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
    },
});

module.exports = mongoose.model('User' , User);