const User = require('../model/UserSchema');

const deleteUser = async(req,res) => {
    try{
        const {username} = req.body;
        const email = username;

        if(!email){
            return res.status(500).json({
                message: "Something went wrong (email not recieved)",
                success: false,
            })
        }

        console.log("Username of deleting user : ",req.body);
        const deleteUser = await User.deleteOne({username: email});
        if(deleteUser){
            console.log("Deleted user: ",deleteUser);
            return res.status(200).json({
                message: "User Removed from DB",
                success: true,
                deletedUser: deleteUser
            })
        }
        return res.status(500).json({
            message: "Something went wrong (user not found)",
            success: false,
        })
    }catch(e) {
        return res.status(400).json({
            message: "Something went wrong",
            success: false,
            error: e.message
        })
    }

}

module.exports = deleteUser;