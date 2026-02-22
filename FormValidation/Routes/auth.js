const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const auth = require("../middlewares/Tokenvalidation")

router.use(cookieParser());

const User = require("../Model/user");

router.post("/SignUp" , async(req,res)=>{
 try{
   const {firstName,lastName,emailId,password} = req.body;

   const hashPassword = await bcrypt.hash(password, 10);
  const dbformat = new User({
      firstName,
      lastName,
      emailId,
      password:hashPassword
  }); 

  await dbformat.save()
  res.send("data added successfully.............")
 }
 catch(e){
  console.log(e.message);
 }
})


router.post("/SignIn",async(req,res)=>{
  try{
    const {emailId,password} = req.body;
    const usercheck = await User.findOne({emailId})
    if(!usercheck){
      throw new Error("Invalid credentials user details not found");
    }
    const isStrongPasswordCorrect = await bcrypt.compare(password,usercheck.password);
    if(!isStrongPasswordCorrect){
      throw new Error("Invalid credentials password is not correct ");
    }

    const token = jwt.sign(
    { id: usercheck._id },
      "vasu12345",
    { expiresIn: "1d" });

    res.cookie("token", token);

    // res.cookie("token","123456");
    res.send(`Login successfully ${usercheck.firstName}`);
  }
  catch(e){
    console.log(e.message);
  }
})



router.get("/profile", auth ,async(req,res)=>{
  try{
   const user = await User.findById(req.user._id);
       res.send(user);
  }
  catch(e){
    console.log("something went wrong")
    res.status(404).send("something went wrong"+e.message);
  }
})


router.post("/edit", auth, async (req, res) => {
  try {
    const allowededitfields = ["firstName","lastName","password"];

    const editallowed = Object.keys(req.body)
      .every(field => allowededitfields.includes(field));

    if(!editallowed){
      return res.status(400).send("Invalid fields to update");
    }

    const loggedInUser = req.user;

    for(const key of Object.keys(req.body)){
      if(key === "password"){
        const bcrypt = require("bcrypt");
        loggedInUser.password = await bcrypt.hash(req.body.password,10);
      } else {
        loggedInUser[key] = req.body[key];
      }
    }

    await loggedInUser.save();

    res.send("Profile updated successfully");

  } catch(err){
    res.status(500).send("Error updating profile");
  }
});




module.exports = router;