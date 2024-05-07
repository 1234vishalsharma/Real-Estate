const adminrouter = require('express').Router();



adminrouter.get('/' , (req,res)=>{
    res.send("Welcome admin");
})



module.exports = adminrouter;
