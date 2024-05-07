const jwt = require('jsonwebtoken');
const User = require('../model/User'); 
// api for login a user
const Signin = async(req,res) => {
    try{
        const {username , password} = req.body;
        const findUser = await User.findone({username , password});
        if(findUser){
            res.status(200).json({
                message: "User Logged in Successfully",
                success: true
            })
        }else{
            res.status(401).json({
                message: "Logged in Failed",
                success: false
            })
        }
    }catch(e){
        res.status(500).json({
            message: "Logged in Failed",
            success: false,
            error: e.message
        })
    }

}
// api for Signup a user
const Signup = async(req,res) => {
    const {username , password} = req.body;
}



module.exports  = {Signin , Signup};