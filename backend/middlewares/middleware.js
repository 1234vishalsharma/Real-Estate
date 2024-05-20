
const jwt = require('jsonwebtoken');
require('dotenv').config("")
const SECRET = process.env.SECRET || "SE3R5TK52";
const adminauthmiddleware = (req,res,next) => {
    const token = req.headers('Authorization');
    
    const {username , password , role} = jwt.decode(token , SECRET); 
    if(role == 'admin'){
        next();
    }else{
        return;
    }
}

const userauthmiddleware = (req,res,next) => {
    const token = req.headers('Authorization');
    
    const {username , password , role} = jwt.decode(token , SECRET); 
    if(role == 'user'){
        next();
    }else{
        return;
    }
}

module.exports = {adminauthmiddleware , userauthmiddleware};


