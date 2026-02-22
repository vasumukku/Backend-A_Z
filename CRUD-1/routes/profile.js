const express = require("express");
const mongoose = require("mongoose");
const Users = require("../utils/user")
const router = express.Router();
//Middlewares
const auth = require("../middlewares/auth")
//validation function for edit profile route
const {validateEditProfileData} = require("../utils/validation")

router.use(express.json()); 

router.get("/profile/view", auth,async (req, res) => {
  try {
    // const token = req.cookies.token;
    // console.log("Token from cookie:", token);
    // if (!token) {
    //   throw new Error("No token provided");
    // }
    // //verify the token
    // const decoded = jwt.verify(token, "vasu12345");
    // console.log("Decoded token:", decoded);  

    // //check if user exists in database
    // const user = await Users.findById(decoded._id);
    // if (!user) {
    //   throw new Error("User not found");
    // } else {
    //   console.log("Welcome to your profile page, " + user.firstName);
    // }
    const user=req.user;
    res.send(user);
  } catch (e) {
    res.status(401).send("Unauthorized access: " + e.message);
  }

});    

router.post("/profile/edit",auth,async(req,res)=>{
  try{
  if(!validateEditProfileData(req)){
    return res.status(400).send("Invalid data format");       

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
    res.status(401).send("Unauthorized access: " + e.message);
  } 

})


module.exports = router;