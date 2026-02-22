const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../utils/user")

//Middlewares 
const auth = require("../middlewares/auth")

const cookieParser = require("cookie-parser");
router.use(cookieParser());

// 🔥 REQUIRED middleware
router.use(express.json());

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password, skills } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new Users({
      firstName,
      lastName,
      emailId,
      password:passwordHash,
      skills 
    });

    await user.save();
    res.status(201).send("User added successfully ✅");

  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await Users.findOne({ emailId }); 
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {

      const token = await jwt.sign({ _id: user._id }, "vasu12345");
      console.log("Generated JWT token:", token);
      res.cookie("token", token); 
      res.send(" Login successful ✅");     

    } else {
      throw new Error("Invalid credentials"); 
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message); 
  } 
});  



router.post("/logout",async(req,res)=>{
  res.cookie("token",null);
  res.send("logout successfully");
})

module.exports = router;