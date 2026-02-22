const mongoose = require("mongoose");

const UserConnectionSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"crud-2",
    required: true,
    
  },

  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
     ref: "crud-2",
    required: true,
   
  },

  status: {
    type: String,
    enum: {
      values: ["interested", "ignored", "accepted", "rejected"],
      message: "{VALUE} is not valid"
    },
    required: true
  }

}, { timestamps: true });


// userConnectionSchema.pre("save",function(next){
//   const connectionRequest = this;
//   if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
//     throw new Error("cannot send connection to yourself")
//   }
//   next();
// });

const ConnectionRequestModel = mongoose.model(
  "connectionRequest",
  UserConnectionSchema
);



module.exports = { ConnectionRequestModel };
