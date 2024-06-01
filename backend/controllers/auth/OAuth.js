const bcrypt = require('bcrypt');
const User = require('../../model/UserSchema');
const jwt = require('jsonwebtoken');


const OAuth = async(req,res) => {
    try{
        const {name , email , photo } = req.body;
        const findUser = await User.findOne({username: req.body.email});
        const age = 1000 * 60 * 60 *24 * 7;
        if(!findUser){
            // Signup account
            const pass = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(pass , 10);
            console.log({name , email});
            
            const CreateUser = await User.create({name , username:email , password: hashedPassword , profilepic: photo });
            const token = jwt.sign({email , pass} , process.env.SECRET , {expiresIn : age});
            return res.status(200).json({
                CreateUser,
                token_id:token
            });

        }else{
            // login account
            const passDecode = jwt.decode(findUser.password , process.env.SECRET);
            const token = jwt.sign({email , passDecode} , process.env.SECRET , {expiresIn: age});
            
            return res.status(200).json(    {
                message: "User created successfully",
                token_id: token,
                success: true
            });
        }
    }catch(e){
        return res.status(500).json({
            message: "User not Authenticated",
            error: e.message,
            success: false
        })
    }
}

module.exports = OAuth;