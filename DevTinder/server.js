const express = require("express");
const app = express();
const mongoose = require("mongoose")
const user =require("./Models")

app.post("/sign",async(req,res)=>{
    let data = new user({
        firstName:"vasumukku",
        lastName:"mukku",
        password:"vasu12345"
    })

    await data.save();
    res.send("data added succesfully");
})


mongoose.
connect("mongodb+srv://vasumukku:<password>@vasu-01.gdjpkob.mongodb.net/devnew")
.then(()=>{
    console.log("database is connected");
    app.listen(4000,()=>{
    console.log("server is runniing .....");
})
})
.catch(()=>{
    console.log("Database is not connected");
})



app.get("/",(req,res)=>{
    res.send("route is woriking");
})

