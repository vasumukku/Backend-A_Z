const jwt = require("jsonwebtoken");
const User = require("../Model/user");




const auth = async (req, res, next) => {
  try {
    // get token
    const token = req.cookies.token;
    console.log(token);
   

    if (!token) {
      return res.status(401).send("No token provided");
    }

    // verify token
    const decoded = jwt.verify(token, "vasu12345");

    console.log(decoded.id);
    // find user
    const userdata = await User.findOne({ _id: decoded.id });

    if (!userdata) {
      return res.status(404).send("User not found");
    }
    

    // attach user
    req.user = userdata;

    next();
  } catch (e) {
    console.log(e.message);
    return res.status(401).send("Authentication failed");
  }
};



module.exports = auth;