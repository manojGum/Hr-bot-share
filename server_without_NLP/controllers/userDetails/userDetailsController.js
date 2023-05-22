const User=require('../../models/user/userModel')
const userDetailsController = async(req,res)=>{
    try {
        const user= req.body;
        const data=  await new User(user)
       data.save()
        .then((response) => {
          res.send(response);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({
            error: "Error saving message",
          });
        });

        
    } catch (error) {
       return res.send(error) 
    }
}

module.exports =userDetailsController