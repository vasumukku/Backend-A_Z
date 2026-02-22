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

//defalut passing data 

router.post("/signin",async(req,res)=>{
  try{
      const userdata = new Users({
  firstName: "Vasu",
  lastName: "Mukku",
  email: "vasu123@gmail.com",
  Password: "StrongPass@123",
  skills: ["Node.js", "Express", "MongoDB"]
})
res.send("data added successsfully");
await userdata.save();
  } 
  catch(e){
    res.status(404).send("something went wrong"+e.message);
    res.status(404).send("something went wrong"+e.message);
  }

})

//pasing data in postman
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, Password, email, skills } = req.body;

    const passwordHash = await bcrypt.hash(Password, 10);

    const data = new Users({
      firstName,
      lastName,
      Password: passwordHash,
      email,
      skills
    });

    await data.save(); // ✅ save first

    return res.send("data added successfully"); // ✅ send response once
  } 
  catch (e) {
    return res.status(500).send("something went wrong: " + e.message);
  }
});



router.post("/login", validateuserdata ,async(req,res)=>{

  try{
    res.send("successfully login");
  }
  catch(e){
    res.send("something went wrong",e.message);
  }

});


router.post("/logout",async(req,res)=>{
  res.cookie("token",null);
  res.send("logout successfully");
})

module.exports = router;



