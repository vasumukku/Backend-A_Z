const express = require("express");
const app = express();
const router = express.Router();

const auth =require("../middlewares/auth")

router.use(express.json());



router.post("/sendConnectionRequest", auth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName+" sent the connection request");
  } catch (e) {
    res.status(401).send("Unauthorized access: " + e.message);
  } 
}) 

module.exports = router;