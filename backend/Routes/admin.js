const adminrouter = require('express').Router();
const SiteModel = require('../model/SiteModel')
const {Signup , Signin} = require('../controller/auth')
const {adminauthmiddleware} = require('../middlewares/middleware');
adminrouter.get('/' , (req,res)=>{
    res.send("upload router");
})

adminrouter.post('/uploadSite' , adminauthmiddleware ,async(req,res)=>{
    try{
        console.log(req.body.siteData);
        const {name , siteImage, sitedata} = req.body.siteData;
        const uploadSite = await SiteModel.create({name:name , siteImage:siteImage , siteData:sitedata});
        if(uploadSite){
            return res.status(200).json({
                message: "Property added Successfully",
                success: true
            })
        }else{
            return res.status(400).json({
                message: "Property not added to db",
                success: false
            })
        }

    }catch(e){
        return res.status(400).json({
            message: "Something went wrong while Uploading Site info",
            error: e.message,
            success: false
        })
    }
})

adminrouter.post('/Signup' , Signup);
adminrouter.post('/Login' , Signin);


module.exports = adminrouter;
