const Property = require('../model/PropertySchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const uploadSiteImages = (siteImages) => {
    // upload images to firebase
}

const PostProperty = async(req,res) => {
    try{
        //  PID , Sitename , Sitedesc , rent , sell , parking , bedrooms, bathrooms , regularPrice , discountedPrice , ImageUrls
        console.log("request is: " , req.body);
        const {PID} = req.body;  
        const {Sitename} = req.body;  
        const {SiteAddress} = req.body;  
        const {Sitedesc} = req.body;
        const {sell} = req.body;
        const {parking} = req.body;
        const {bedrooms} = req.body;
        const {area} = req.body;
        const {bathrooms} = req.body;
        const {regularPrice} = req.body;
        const {discountedPrice} = req.body;
        const {ImageUrls} = req.body;
        const {token} = req.headers;
        const sitetype = sell===true ? "sell" : "rent";
        const user = jwt.verify(token , process.env.SECRET);     
        
        // uploadSiteImages(ImageUrls);
        console.log("data is: " , req.body);

        if(PID){
            const postProperty = await Property.create({
                pid: PID,
                name:Sitename,
                desc:Sitedesc,
                address: SiteAddress,
                regularPrice,
                discountedPrice,
                bathrooms: bathrooms,
                bedrooms: bedrooms,
                area: area,
                sitetype: sitetype,
                parking: parking,
                images: ImageUrls,
                user: user.toString()
            });


            if(postProperty){
                return res.status(200).json({
                    message: "Property Successfully posted",
                    success: true,
                    site: postProperty
                })
            }
        }
        return res.status(500).json({
            message: "Cannot 'post property",
            success: false
        })

    }catch(e){
        return res.status(500).json({
            message: "Cannot post your property",
            success: false,
            error : e.message,
        })
    }
}

module.exports = PostProperty