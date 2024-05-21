const jwt = require('jsonwebtoken');
const User = require('../model/User'); 
const bcrypt = require('bcrypt');

require("dotenv").config();
const SECRET = process.env.SECRET || "SE3R5TK52";
// api for login a user
const Signin = async(req,res) => {
    try{
        const {username , password} = req.body;
        console.log(req.body);
        console.log(username , " " , password);
        const findUser = await User.findOne({username , password});
        const matchpassowrd = bcrypt.compare(password , findUser.password  , function(err,res) {
            if(err){
                res.status(500).json({
                    message: "Logged in Failed (Passowrd didn't matched)",
                    success: false
                })
            }
        });
        if(findUser){
            const role = findUser.role;
            const payload = {
                username , password , role
            }
            const token = jwt.sign(payload , SECRET);
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
        const hashedPassword = await bcrypt.hash(String(password) , 10);        // bcrypt.hash(password , salt);
        const putUsertoDB = await User.create({username , password:hashedPassword , name , role});
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