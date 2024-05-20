const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.DB_URL , {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(()=>{
        console.log("Database Connected Successfully");
    }).catch((e) => {
        console.log("error in connecting with database " + e.message);
    })
}
