const User = require('../model/UserSchema');

const UpdateUser = async(req,res) => {
    const {username , phoneno , profile_pic} = req.body;
    console.log("update body is: " , req.body);
    try{
         const updateUser = await User.findOneAndUpdate( {username} ,{$set: {phoneno , profilepic : profile_pic} } , {
            returnDocument: 'after'});
         if(updateUser){
            return res.status(200).json({
                message: "User updated successfully",
                success: true,
                User: updateUser
            });
         }
         return res.status(500).json({
            message: "Cant Update User (user not found)",
            success: false
         });
    }catch(e) {
        return res.status(400).json({
            message: "can't Update user (inside catch)",
            success: false,
            error: e.message
        });
    }
}

module.exports = UpdateUser;