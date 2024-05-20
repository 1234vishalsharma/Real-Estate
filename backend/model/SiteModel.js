const mongoose = require('mongoose');
const SiteModel = new mongoose.Schema({
    siteId:{
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    siteImage: [{
        type: String,
        required: true
    }],
    siteData: {
        type: String,
        required: true,
    }
});
module.exports = mongoose.model("SiteModel" , SiteModel);