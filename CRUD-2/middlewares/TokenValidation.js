const jwt = require("jsonwebtoken");
const users = require("../models/user"); // adjust path
const express = require("express") 
const app=express()


app.use(express.json()) 
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new Error("Token not found");
    }

    const decoded = jwt.verify(token, "vasu12345");

    if (!decoded || !decoded._id) {
      throw new Error("Invalid token");
    }

    const user = await users.findById(decoded._id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();

  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = { auth };
