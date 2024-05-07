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
        reqired: true
    }
});

module.exports = mongoose.model('User' , User);