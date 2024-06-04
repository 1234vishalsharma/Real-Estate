const PostProperty = async(req,res) => {
    try{
        
        

    }catch(e){
        return res.status(500).json({
            message: "Cannot post your property",
            success: false,
            error : e.message,
        })
    }
}

module.exports = PostProperty