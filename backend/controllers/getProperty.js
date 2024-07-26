const property = require("../model/PropertySchema.js");

const filterSite = async(req,res) => {
    try{
        const data = req.body;
        const site = await property.find(data);
        console.log(site);
        if(site){
            return res.status(200).json({
                message: "Sites are" ,
                data : data,
                success: true
            })
        }
    }catch(e){
        return res.status(500).json({
            message: "Not Found",
            success: false,
            error: e.message
        })
    }
}

const getProperty = async(req,res) =>{
    try{
        const data = await property.find();
        console.log(data);

        return res.status(200).json({
            data: data,
            success: true
        });
    }catch(error){
        return res.status(404).json({
            message : "Cannot get properties",
            success: true,
            error: error.message
        })
    }
}

module.exports = {getProperty ,filterSite}