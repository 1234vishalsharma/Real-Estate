const jwt = require('jsonwebtoken');
const User = require('../model/User'); 
require("dotenv").config();
const SECRET = process.env.SECRET || "SE3R5TK52";
// api for login a user
const Signin = async(req,res) => {
    try{
        const {username , password} = req.body;
        console.log(req.body);
        console.log(username , " " , password);
        const findUser = await User.findOne({username , password});
        if(findUser){
            const role = findUser.role;
            const payload = {
                username , password , role
            }
            const token = jwt.sign(payload , SECRET);
            console.log("Token is : ", token);
            res.status(200).json({
                message: "User Logged in Successfully",
                success: true,
                user: findUser,
                token: token
            })
        }else{
            res.status(500).json({
                message: "Logged in Failed (User not exist)",
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
    try{
        const {username , password, name , role} = req.body;
        console.log(req.body);
        console.log(username , " "  , password , " " , name , " " , role );
        const putUsertoDB = await User.create({username , password , name , role});
        if(putUsertoDB){
            return res.status(200).json({
                message: "User Created Successfully",
                success: true
            })
        }else{
            return res.status(500).json({
                message: "Something went wrong while creating user",
                success: false
            })
        }
    }catch(e){
        return res.status(500).json({
            message: "Unable to create account",
            sucess: false,
            error: e.message
        })
    }
}



module.exports  = {Signin , Signup};