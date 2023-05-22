const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    question: {
        type:String,
        lowercase: true
    },
    response:{
        type :String,
        lowercase: true
    }
  });
  
  // Define the model for the chat messages
  const WhatsappMessage = mongoose.model('Message', messageSchema);

  module.exports = WhatsappMessage