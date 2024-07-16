const property = require("../model/PropertySchema.js");

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

module.exports = getProperty