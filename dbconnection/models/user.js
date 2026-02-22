const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
    FirstName:{
        type:String
    },
    LastName:{
        type:String
    },
    Password:{
        type:String
    },
    Age:{
        type:Number
    }
})

module.exports=mongoose.model("newuser",userSchema)