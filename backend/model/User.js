const mongoose = require('mongoose');

const User =  new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    password : {
        type: String,
        reqquired: true
    },
    name: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        required: true    
    }
});

module.exports = mongoose.model('User' , User);