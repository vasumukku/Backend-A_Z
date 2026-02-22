const express = require("express");
const router = express.Router();
const {auth} = require("../middlewares/TokenValidation");
const {ConnectionRequestModel} =require("../models/connectionRequest");
const { default: mongoose } = require("mongoose");
const User = require("../models/user");
// router.post("/sendconnection",auth,async(req,res)=>{
//   try{
//   const user=req.user;
//   res.send(user.firstName+" sent the connection request");
//   }
//   catch(e){
//     res.status(404).send("something went wrong");
//   }
// }) 


router.post("/request/send/:status/:touserId", auth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.touserId;
    const status = req.params.status;


    const allowedStatus = ["ignored","interested"]
    if(!allowedStatus.includes(status)){
      return res.status(400).send("invalid status type "+status);
    }

    const existingConnectionRequest = await ConnectionRequestModel.findOne({
      $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId} 
      ]
    });


    if (existingConnectionRequest){
      return res.status(400).send("Connection request already exists");
    }


    const getDataToUser = await User.findById(toUserId);

if (!getDataToUser) {
  return res.status(400).send("User id is not valid");
}


//it is optional alredy we are apply same logic in connection request schema like pre ()
if (fromUserId.equals((toUserId))) {
  return res.status(400).send("You cannot send connection request to yourself");
}  



    // console.log(getDataToUser);
    // create document using model
    const connectionRequest = new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status
    });

    const data = await connectionRequest.save();

    res.json({
      message:req.user.firstName+ "connection  request sent successfully  to " + getDataToUser.firstName ,
      data
    })
  } catch (e) {
    res.status(400).send(e.message);
  } 
});

router.post("/request/review/:status/:requestId", auth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const { status, requestId } = req.params;

    const allowedStatus = ["accepted", "rejected"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).send("Status is not valid");
    }

    const requestDoc = await ConnectionRequestModel.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested"
    });

    if (!requestDoc) {
      return res.status(404).send("Connection request not found");
    }

    requestDoc.status = status;

    const data = await requestDoc.save();

    res.json({
      message: "Connection request " + status,
      data
    });

  } catch (e) {
    res.status(500).send("Error: " + e.message);
  }
});


module.exports=router;