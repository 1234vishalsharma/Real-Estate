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
        type: Number,
        required: true
    },
    DiscountedPrice: {
        type: Number,
    },
    bathrooms: {
        type:Number,
        required: true
    },
    bedrooms:{
        type: Number,
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