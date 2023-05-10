const mongoose = require("mongoose");

let clientSchema= new mongoose.Schema({
    query:{type:String, required:true},
    from:String,
    createdOn:{type:Date, default:Date.now}
  });
  const ClientModel = mongoose.model('clientmessages',clientSchema)
  module.exports =ClientModel