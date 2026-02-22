const express = require("express")
const app = express();
const mongoose = require("mongoose");

const Users = require("./models/user")

const bcrypt = require("bcrypt"); // or bcrypt

const {validateuserdata} = require("./middlewares/Validation");
const { validateEditProfileData} =require("./middlewares/Editvalidation")
const {auth} = require("./middlewares/TokenValidation");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());

//defalut passing data 

// app.post("/signin",async(req,res)=>{
//   try{
//       const userdata = new Users({
//   firstName: "Vasu",
//   lastName: "Mukku",
//   email: "vasu123@gmail.com",
//   Password: "StrongPass@123",
//   skills: ["Node.js", "Express", "MongoDB"]
// })
// res.send("data added successsfully");
// await userdata.save();
//   } 
//   catch(e){
//     res.status(404).send("something went wrong"+e.message);
//     res.status(404).send("something went wrong"+e.message);
//   }

// })

// //pasing data in postman
// app.post("/signup",async(req,res)=>{
//   try{
     
//       const{firstName,lastName,Password,email,skills}=req.body;
//        const passwordHash = await bcrypt.hash(Password, 10);
//       const data = new Users({
//         firstName,
//         lastName,
//         Password:passwordHash,
//         email,
//         skills
//       });
      
//       res.send("data added successsfully");
//       await data.save();
//   }  
//   catch(e){
//     res.status(404).send("something went wrong"+e.message);
//   }

// })


// app.post("/login", validateuserdata ,async(req,res)=>{

//   try{
//     res.send("successfully login");
//   }
//   catch(e){
//     res.send("something went wrong",e.message);
//   }

// });


// app.post("/logout",async(req,res)=>{
//   res.cookie("token",null);
//   res.send("logout successfully");
// })   

 const authRoutes = require("./Routes/auth");
 const profileRoutes = require("./Routes/profile");
 const requestRoutes = require("./Routes/request")
 const userRoutes = require("./Routes/user")

 app.use("/", authRoutes);
 app.use("/",profileRoutes);
 app.use("/",requestRoutes);
 app.use("/",userRoutes)

// app.get("/profile/view", auth, async (req, res) => {
//   try {
//     const user = await Users.findById(req.user._id);
//     res.send(user);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// });

// app.post("/profile/edit",auth,async(req,res)=>{

//   try{
//     if(! validateEditProfileData(req)){
//     throw new Error("something went wrong you are trying to ");
//   }

//   const loggedInUser=req.user;
//   console.log("user details in  before edit profile route"+loggedInUser)
//   Object.keys(req.body).forEach((key)=>{
//     loggedInUser[key]=req.body[key];
//   })
//   console.log("user details in after edit profile route"+loggedInUser)
//   await loggedInUser.save();
//   res.send("Profile updated successfully"); 
//   }
//   catch(e){
//     res.status(404).send(e.message);
//   }
  
// })


// app.post("/sendconnection",auth,async(req,res)=>{
//   try{
//   const user=req.user;
//   res.send(user.firstName+" sent the connection request");
//   }
//   catch(e){
//     res.status(404).send("something went wrong");
//   }
// }) 



mongoose.connect("mongodb+srv://vasumukku:vasu12345@vasu-01.gdjpkob.mongodb.net/CRUD-2") 
.then(()=>{
  console.log("Database is connected");
  app.listen(4000,()=>{
  console.log("server is running port no is 4000 ......");
})
})
.catch(()=>{
  console.log("database  is something went wrong please go and check");
})



