const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const users = require("../utils/user");
const express = require("express")

app.use(express.json())

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Authentication token not found");
    } 
   const decoded = jwt.verify(token, "vasu12345");
  //  console.log("userdecoded details"+decoded)  it is retun 2 objects 

   const{_id}=decoded 
   const user = await users.findById(_id);
   if(!user){
    throw new Error("user not found");
   }
   req.user=user;
    next(); 
  } catch (err) { 
    res.status(401).send("Unauthorized: " + err.message); 
  } 
};

module.exports = authMiddleware;