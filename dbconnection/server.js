const express = require("express")
const app=express()
const user = require("./models/user") 
const mongoose = require("mongoose")


app.use(express.json()) 


app.post("/signin",async(req,res)=>{

    //creating a new instance of user model

    //default added data in compasss
    // const data = new user({ 
    //     FirstName:"vasu",
    //     LastName:"Mukku",
    //     Password:"Vasu12345",
    //     Age:25

    // })

    //inside postamn raw and select json and import middleware to convert json() the it is working f
    const data = new user(req.body)
    try{
    await data.save();
    res.send("data added succesfully");
    }catch(e){
        res.status(404).send("something wrong");
    }
    
})

//particular document access
app.get("/use", async(req,res)=>{
    const userentername = req.body.FirstName;

    console.log(userentername);
    let dbdata = await user.find({FirstName:userentername});
    console.log(dbdata);
    res.send("data sended go to check console") 

})
 

//print all documents
app.get("/alldata", async(req,res)=>{
    let alldata = await user.find({})
    console.log(alldata);
    res.send(alldata);

})

//delete for one element 
app.delete("/delete",async(req,res)=>{
    const userdeletevalue = req.body.FirstName

    let deletevalue =await user.findOneAndDelete({FirstName:userdeletevalue})
    res.send("deleted dataa successfunlly");
})


//update documnets
app.patch("/update",async(req,res)=>{
    const userdeletevalue = req.body.FirstName
    const data=req.body

    let updated =await user.findOneAndUpdate({FirstName:userdeletevalue},data)
    res.send("dataa updated successfully");  
})


mongoose.connect("mongodb+srv://vasumukku:vasu12345@vasu-01.gdjpkob.mongodb.net/newdb")
.then(()=>{
    console.log("db connected")
    app.listen(6000,()=>{
    console.log("server is running....")
})
})
.catch((e)=>{
    console.log("db is not connecting something  went wrong",e)
})


app.get("/",(req,res)=>{
    res.send("6000 server and / is working")
})

app.get("/products",(req,res)=>{
    res.send("products path is working");
})

