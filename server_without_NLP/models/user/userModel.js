const mongoose = require("mongoose");

let userSchema= new mongoose.Schema({
    phone:{type:String, required:true,unique: true},
    name:{
        type:String, required:true,
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        default:"male",
        enum: ["male","female"]
    },
    createdOn:{type:Date, default:Date.now}
  });
  const User = mongoose.model('botuser',userSchema)
  module.exports =User