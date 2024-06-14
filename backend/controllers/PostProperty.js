const Property = require('../model/PropertySchema');
const Generate = require('../utils/GeneratePid'); 


const uploadSiteImages = (siteImages) => {
    
}


const PostProperty = async(req,res) => {
    try{
        const pid = Generate();
        const data = req.body;  
        const siteImages = req.files;
        uploadSiteImages(siteImages);
        console.log("data is: " , data , "files: " , siteImages);

        if(pid){
            
            const postProperty = await Property.create({
                pid,
                name:data.name,
                desc:data.desc,
                addresss: data.address,
                regularPrice: data.regularPrice,
                DiscountedPrice: data.DiscountedPrice,
                bathrooms: data.bathrooms,
                bedrooms: data.bedrooms,
                sitetype: data.sitetype,
                parking: data.parking,
                images: siteImages,
                user: data.user
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