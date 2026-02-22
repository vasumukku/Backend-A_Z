const mongoose= require("mongoose");
const express = require("express");
const Users = require("../models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const validateuserdata = async (req,res,next)=>{
  try{
    const{email,Password} = req.body;
  const user = await Users.findOne({email});
  if(!user){
    throw new Error ("invalid credentials");
  }
  const comparePassword = await bcrypt.compare(Password,user.Password); 
  if(!comparePassword){
    throw new Error("Invalid password");
  }

   const token = await jwt.sign({ _id: user._id }, "vasu12345");
   console.log("Generated JWT token:", token);
  res.cookie("token", token);   
  next();
  }
  catch(e){
    res.status(404).send(e.message);
  }
  

} 

module.exports = { validateuserdata };
