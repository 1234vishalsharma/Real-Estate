const mongoose = require('mongoose');

const Property = new mongoose.Schema({
    pid: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    address: {
        type: String,
        requrie: true
    },
    regularPrice: {
        type: String,
        required: true
    },
    DiscountedPrice: {
        type: String,
    },
    bathrooms: {
        type:String,
        required: true
    },
    bedrooms:{
        type: String,
        required: true
    },
    sitetype: {
        type: String,
        required: true
    },
    parking: {
        type: Boolean,
        required: true,
        default: false
    },
    images: {
        type: Array,
        required: true
    },
    user: {
        type: String,
        required: true
    }
} , {timestamps: true});

module.exports = mongoose.model('Property' , Property);