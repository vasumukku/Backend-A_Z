const express = require("express")
const app = express()
const bcrypt=require("bcrypt");
const mongoose = require("mongoose")
const {validateSigUpData} = require("./utils/Validation")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
app.use(cookieParser());

const users = require("./Models/users")
// const user = require("../dbconnection/models/user")

app.use(express.json())

//here we are applying validations separate in util files
app.post("/signup",async(req,res)=>{

    try{
        //validation of data
    validateSigUpData(req)
    const{firstName,lastName,emailId,password,skill,gender}=req.body;
    //Encrypt the password  here we store encrypt password for security purpose
    const passwordHash = await bcrypt.hash(password,10);
    console.log(passwordHash);
    //creating a new insatance of the user model 
    const user = new users({
        firstName,
        lastName,
        emailId,
        password:passwordHash,
        skill,gender
    });
    await user.save();
    res.send("user Added successsfully");
    }
    catch(err){
        res.status(404).send("ERROR:  "+err.message);

    }


})

//login status checking user really enter correct password or not and here we cheeck encrpt password

app.post("/login",async(req,res)=>{
    try{
        const{emailId,password}=req.body;
        const user = await users.findOne({emailId:emailId});
        if(!user){
            throw new Error("invalid credentials");

        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(isPasswordValid){

            const token= await jwt.sign({_id:user._id}, "vasu12345");
            console.log(token);
            res.cookie("token",token);
            res.send("Login Successfull !!!");
        }else{
            throw new Error("invalid credentials");

        }
    }catch(err){
        res.status(404).send("ERROR :"+err.message);

    }
});



app.get("/profile", async(req,res)=>{
   

    //validaate the token
    try{
         const token = req.cookies.token;
        console.log(token);

        if(!token){
        throw new Error("Unauthorized access");
         }   
        const decoded = await jwt.verify(token,"vasu12345");    
        console.log(decoded);
        const{ _id}= decoded;
        // const user = await users.findById(_id);  
        // if(!user){
        //     throw new Error("User not found");
        // }else{
        //     console.log("welcome to your profile page",user.firstName);
        // }
        console.log(_id);
        const user = await users.findById(_id);
        if(!user){
            throw new Error("User not found");
        }else{
            console.log("welcome to your profile page",user.firstName);
        }
         res.send(user);
    }
    catch(e){
        return res.status(401).send("Unauthorized access");
    } 
   
    // if(token === "vasu12345"){
    //     res.send("welcome to your profile page");
    // }else{
    //     res.status(401).send("Unauthorized access");
    // }   
}) 

//default values enter
app.post("/signin",async(req,res)=>{
    const data = new users({
        firstName:"vasu",
        lastName:"mukku",
        password:"Vamsi@2001123456",
        emailId:"vasu01@gmail.com",
        gender:"male",
        skill:["python","mernstack","sql","Nosql"],
        
    })

    try{
        await data.save();
        res.send("data updated successfullly");
    }catch(e){
        res.status(400).send("something went wrong"+e)
    }
})



//print all data
app.get("/alldata",async(req,res)=>{
    try{
        const alldata = await users.find({})
        console.log(alldata);
        res.send(alldata);
    }
    catch(e){
        res.status(404).send("something went wrong");
    }
})

//api validations 
app.patch("/update",async(req,res)=>{
    try{
        const userdata = req.body.firstName
        const alldata = req.body 

        const ALLOWED_UPDATES = ["firstName","lastName","skill","password"];
        const isUpdateAllowed = Object.keys(alldata).every((k)=>
        ALLOWED_UPDATES.includes(k)) ;
        if(!isUpdateAllowed){
            throw new Error("update not allowed");
        }

        const updatedvalue = await users.findOneAndUpdate({firstName:userdata},alldata,{
            runValidators:true
        });
        res.send("dtata updated successfully") 
    }
    catch(e){
        res.status(404).send("sommething went wrong"+e);
    }
})


mongoose.connect("mongodb+srv://vasumukku:vasu12345@vasu-01.gdjpkob.mongodb.net/DbValidation")
.then(()=>{
    console.log("Database is connected....")
    app.listen(400,()=>{
    console.log("server 4000 port is running........");
})
})
.catch(()=>{
    console.log("Database is not connected");
})



