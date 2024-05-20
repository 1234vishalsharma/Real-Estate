const userrouter = require('express').Router();

const SiteModel = require('../model/SiteModel')
const {Signin} = require('../controller/auth')
const {Signup} = require('../controller/auth')

userrouter.get('/' , (req,res)=>{
    res.send("Welcome user");
})

userrouter.get('/listproperty' , async(req,res)=>{
    try{
        const propertyData = await SiteModel.find({});

        return res.json({
            message: "testing the api",
            success: true,
            data: propertyData 
        })
    }catch(e){
        return res.json({
            message: "testing the api",
            success: false,
            error: e.message
        })
    }  
})

userrouter.post('/Login' , Signin);
userrouter.post('/Signup' , Signup);



module.exports = userrouter;
