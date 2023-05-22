const WhatsappMessage = require("../models/whatsappMessageModel");

const addMessageController = async (req,res)=>{
    const messaged = await new WhatsappMessage({
        question: req.body.question,
        response: req.body.answer,
      });
  
      messaged.save()
        .then((response) => {
          res.send(response);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({
            error: "Error saving message",
          });
        });

}

module.exports= addMessageController