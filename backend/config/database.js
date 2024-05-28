const mongoose = require('mongoose')

exports.connect = (DBURL) => {
    const db = mongoose.connect(DBURL);
    
    db.then(()=>{
        console.log("Database connected succssfully");
    }).catch((e)=>{
        console.log("Error in connecting the database " ,e);
    })
}
