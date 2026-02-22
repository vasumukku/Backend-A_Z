const mongoose= require("mongoose");
const validate = require("validator");

const userSchemas = new mongoose.Schema({
  firstName:{
    type:String,
    required:true,

  },
  lastName:{
    type:String
  },
  Password:{
    type:String,
    validate(value){
      const isPasswordValid = validate.isStrongPassword(value);
      if(!isPasswordValid){
        throw new Error("Password is not strong");
      }
    }
  
  },
  email:{
    type:String,
    unique:true,
    lowercase:true,
    validate(value){
      if(!validate.isEmail(value)){
        throw new Error("Invalid email address");
      }
    }

  },
  skills:{
    type:[String],
    default:[]
  }

},
{timestamps:true})


module.exports=mongoose.model("crud-2",userSchemas)