
const User = require('../../model/UserSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Login = async(req,res) => {
    try{
        const {username , password} = req.body;
        console.log("Username: ",username , "\nPassword: " , password)
        const FindUser = await User.findOne({ username  });
        console.log(process.env.SECRET);
        if(FindUser){
            const hashPass = await bcrypt.compare(password , FindUser.password);
                if(hashPass){
                    const age = 1000 * 60 * 60 *24 * 7;
                    const token = jwt.sign({username , password} , process.env.SECRET , {expiresIn : age});
                    
                    // return res.cookie("token_id" , token , {
                    //     maxAge: age,
                    //  }).status(200).json({
                    //     message: "User Login Successfully",
                    //     success: true,
                    //     token_id: token
                    // })

                    // return res.cookie('access_token',token , {httpOnly: true}).json({
                    //     message: "User Login Successfully",
                    //     success: true,
                    //     token_id: token
                    // });
                    
                    return res.status(200).json({
                        message: "User Login Successfully",
                        success: true,
                        token_id: token
                    })
                }
            return res.status(401).json({
                message: "token not created (password unmatched)",
                success: false
            })
        }
        return res.status(400).json({
            message: "User not exist (cant find user)",
            success: false
        })
    }catch(e){
        return res.status(500).json({
            message: "User Login Failed inside Catch",
            success: false,
            error: e.message
        })
    }
}
module.exports = Login;
