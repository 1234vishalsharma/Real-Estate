const jwt = require('jsonwebtoken');
const User = require('../model/UserSchema');
require("dotenv").config();
const getUSer = async(req,res) => {
    try{

        const token = req.body.token;
        console.log("ye raha token ",token);
        const decode = jwt.decode(token , process.env.SECRET);
        const username = decode.username;
        console.log("ye raha username " , username);
        const isUserExist = await User.findOne({username});
        console.log(isUserExist);
        if(isUserExist){ 
           return res.status(200).json({
                username,
                name: isUserExist.name,
                profile_pic: isUserExist.profilepic
            });
        }

        return res.status(500).json({
            message: "user not found",
            success: false
        });

    }catch(e){
        return res.status(401).json({
            message: "User Data not found inside catch",
            success: false,
            error: e.message
        });
    }
}

module.exports = getUSer;