const express=require("express");
const userRouter = express.Router();
const {auth} = require("../middlewares/TokenValidation");
const { ConnectionRequestModel } = require("../models/connectionRequest");
const { use } = require("react");


//get all pending requests
userRouter.get("/user/request", auth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "accepted"
    }).populate("fromUserId", ["firstName", "lastName"]);

    res.send(connectionRequests);

  } catch (e) {
    res.status(404).send("ERROR: " + e.message);
  }
});

userRouter.get("/user/connections",auth,async(req,res)=>{
  try{
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequestModel.find({
      $or:[
        {toUserId:loggedInUser._id, status:"accepted"},
        {fromUserId:loggedInUser._id,status:"accepted"} 
      ]

      
    }).populate("fromUserId",["firstName","lastName"]).populate("toUserId",["firstName","lastName"]);

    const data = connectionRequest.map((row)=>{
      if(row.fromUserId.toString()===loggedInUser._id.toString()){
        return row.toUserId;
      }
      return row.fromUserId;
    })
    res.send(data);
  }catch(e){

  }
})

userRouter.get("/feed" ,auth ,async(req,res)=>{
  try{
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequestModel .find({
      $or:[{fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}

      ]
    }).select("fromUserId toUserId").populate("fromUserId","firstName").populate("toUserId","firstName");
    res.send(connectionRequest);
  }catch(e){
    res.status(404).send("something wrong "+e.message);
  }
})


module.exports=userRouter;
