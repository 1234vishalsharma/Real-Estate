const User = require('../model/UserSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const VerifyUser = async(req,res,next) => {
    
    try{
        const {token} = req.headers
        const decode = jwt.verify(token , process.env.SECRET);        
        console.log(decode);
        const IsExist = await User.findOne({username: decode.username});
        console.log("Db user is: ", IsExist);
        if(IsExist){
            console.log("User is verified");
            next();
        }else{
            return res.status(401).json({
                success: false,
                message: "User not exits (Unverified)"
            });
        }
        
    }catch(e){
        return res.status(401).json({
            message: "User not verified",
            success: false,
            error : e.message
        })
    }

}

module.exports = VerifyUser