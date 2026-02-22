const express = require("express");
const app=express();
const mongoose = require("mongoose");
const users = require("./Models/user")


app.use(express.json());

//default postingdata
app.post("/signin", async (req, res) => {
  const data = new users({
    firstName: "vasu",
    lastName: "mukku",
    password: "vasu12345",
    emailId: "mukkuvasu01@gmail.com"
  })
  try{
     await data.save()
  res.send("User saved successfully")
  }
  catch(e){
    res.status(404).send("something went wrong"); 
  }
 
})

//passing as a args dataa
app.post("/senddata",async(req,res)=>{
    const userentereddata = req.body
    try{
        const data = new users(userentereddata);
        await data.save()
        res.send(userentereddata);
    }
    catch(e){
        res.status(404).send("something went wrong");
    } 
    
})

//printing all users data 
app.get("/alldata",async(req,res)=>{
    try{
    let alldata = await users.find({})
    console.log(alldata);
    res.send(alldata);
    }
    catch(e){
        res.status(404).send("something went wrong") 
    }
    
})
//getting particular person data
app.get("/user",async(req,res)=>{
      try{
    const userName = req.body.firstName 
    const userdata = await users.find({firstName:userName}) 
    res.send(userdata);
    }
    catch(e){
        res.status(404).send("something went wrong")
    }
   
})
//updating dataa
app.patch("/update",async(req,res)=>{

    try{
    const userupdatedvalue = req.body.firstName
    const alldata = req.body

    const updatedata = await users.findOneAndUpdate({firstName:userupdatedvalue},alldata)
    res.send("data updated successfully");
    }
    catch(e){
        res.status(404).send("something went wrong")
    }
   
}) 

//deleting particular data
app.delete("/delete",async(req,res)=>{
    const userdeletename = req.body.firstName

    try{
    const findanddelete = await users.findOneAndDelete({firstName:userdeletename})
    res.send("deleted successsfully")
    }
    catch(e){
        res.status(404).send('something went wrong');
    }
   

})

mongoose.connect("mongodb+srv://vasumukku:<password>@vasu-01.gdjpkob.mongodb.net/CRUD")
.then(()=>{
    console.log("Database is connected");
    app.listen(4000,()=>{
    console.log("server is runnning port number 4000...."); 
})
})
.catch((e)=>{
    console.log("Db not connected something went wrong");
})





