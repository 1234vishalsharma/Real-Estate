
const User = require('../../model/UserSchema');
const bcrypt = require('bcrypt');

const Signup = async(req,res) => {
    try{
        const {name , username , password , phoneno} = req.body;
        console.log({name , username , password , phoneno});
        const hashedPass = (await bcrypt.hash(password , 10)).toString();
        const CreateUser = await User.create({name , username , password:hashedPass , phoneno});
        
        return res.status(200).json({
            message: "User created successfully",
            success: true
        });

    }catch(e){
        return res.status(500).json({
            message: "Cannot create account inside catch",
            success: false,
            error: e.message
        })
    }

}
module.exports = Signup;