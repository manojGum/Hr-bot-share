const User=require('../../models/user/userModel')
const getuserDetailsController = async (req,res)=>{
    try {

        const user = await User.findOne({ phone: req.params.phone},{
            _id: 0,
            createdOn:0,
            __v:0
          });

        if (!user) {
            res.status(500).json({ success: false })
        }
        res.send(user)
    } catch (err) {
        res.status(500).json({
            error: err,
            success: false
        })
    }
    
}

module.exports =getuserDetailsController