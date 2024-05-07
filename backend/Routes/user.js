const userrouter = require('express').Router();



userrouter.get('/' , (req,res)=>{
    res.send("Welcome user");
})



module.exports = userrouter;
