const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Users = require("../models/user")

const bcrypt = require("bcrypt"); // or bcrypt

const {validateuserdata} = require("../middlewares/Validation");
const { validateEditProfileData} =require("../middlewares/Editvalidation")
const {auth} = require("../middlewares/TokenValidation");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.use(express.json());

router.get("/profile/view", auth, async (req, res) => {
  try {
    const user = await Users.findById(req.user._id);
    res.send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post("/profile/edit",auth,async(req,res)=>{

  try{
    if(! validateEditProfileData(req)){
    throw new Error("something went wrong you are trying to ");
  }

  const loggedInUser=req.user;
  console.log("user details in  before edit profile route"+loggedInUser)
  Object.keys(req.body).forEach((key)=>{
    loggedInUser[key]=req.body[key];
  })
  console.log("user details in after edit profile route"+loggedInUser)
  await loggedInUser.save();
  res.send("Profile updated successfully"); 
  }
  catch(e){
    res.status(404).send(e.message);
  }
  
})

module.exports = router;