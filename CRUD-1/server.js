const express = require("express");
const mongoose = require("mongoose");
const app = express();


// const Users = require("./utils/user")
// //Middlewares 
// const auth = require("./middlewares/auth")

// //json parsing middleware
// const jwt = require("jsonwebtoken");

// //conversion of password into hash for security purpose
// const bcrypt = require("bcrypt");

//for cookie handling



const cookieParser = require("cookie-parser");
app.use(cookieParser());

// 🔥 REQUIRED middleware
app.use(express.json());

//signup route and login route are moved to auth.js file in routes folder and imported here as router
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const requestRoutes = require("./routes/request");


app.use("/", authRoutes);
app.use("/", profileRoutes);
app.use("/", requestRoutes);


// app.post("/signup", async (req, res) => {
//   try {
//     const { firstName, lastName, emailId, password, skills } = req.body;
//     const passwordHash = await bcrypt.hash(password, 10);

//     const user = new Users({
//       firstName,
//       lastName,
//       emailId,
//       password:passwordHash,
//       skills 
//     });

//     await user.save();
//     res.status(201).send("User added successfully ✅");

//   } catch (err) {
//     res.status(400).send("ERROR: " + err.message);
//   }
// });



// app.post("/login", async (req, res) => {
//   try {
//     const { emailId, password } = req.body;
//     const user = await Users.findOne({ emailId }); 
//     if (!user) {
//       throw new Error("Invalid credentials");
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (isPasswordValid) {

//       const token = await jwt.sign({ _id: user._id }, "vasu12345"); 
//       console.log("Generated JWT token:", token);
//       res.cookie("token", token);
//       res.send("Login successful ✅");     

//     } else {
//       throw new Error("Invalid credentials"); 
//     }
//   } catch (err) {
//     res.status(400).send("ERROR: " + err.message); 
//   } 
// });  



// app.get("/profile", auth,async (req, res) => {
//   try {
//     // const token = req.cookies.token;
//     // console.log("Token from cookie:", token);
//     // if (!token) {
//     //   throw new Error("No token provided");
//     // }
//     // //verify the token
//     // const decoded = jwt.verify(token, "vasu12345");
//     // console.log("Decoded token:", decoded);  

//     // //check if user exists in database
//     // const user = await Users.findById(decoded._id);
//     // if (!user) {
//     //   throw new Error("User not found");
//     // } else {
//     //   console.log("Welcome to your profile page, " + user.firstName);
//     // }
//     const user=req.user;
//     res.send(user);
//   } catch (e) {
//     res.status(401).send("Unauthorized access: " + e.message);
//   }

// });

// app.post("/sendConnectionRequest", auth, async (req, res) => {
//   try {
//     const user = req.user;
//     res.send(user.firstName+" sent the connection request");
//   } catch (e) {
//     res.status(401).send("Unauthorized access: " + e.message);
//   } 
// }) 







mongoose
  .connect("mongodb+srv://vasumukku:<password>@vasu-01.gdjpkob.mongodb.net/CRUD-1")
  .then(() => {
    console.log("Database connected...");
    app.listen(4000, () => {
      console.log("Server running on port 4000");
    });
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });
