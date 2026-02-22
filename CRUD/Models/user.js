const mongoose = require("mongoose");
const { schema } = require("../../dbconnection/models/user");

const userscheme = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    password:{
        type:String
    },
    emailId:{
        type:String
    } 
})

module.exports=mongoose.model("crud",userscheme);