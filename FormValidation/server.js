const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express()
const PORT = 4000;

// middleware to read JSON body
app.use(express.json());

// routes
const authRoutes = require("./Routes/auth");
app.use("/", authRoutes);



















mongoose.connect("mongodb+srv://vasumukku:vasu12345@vasu-01.gdjpkob.mongodb.net/formValidation") 
.then(()=>{
  console.log("Database connected ........")
  app.listen(PORT,()=>{
  console.log("server runnning port number 4000 ............")
})

})
.catch(()=>{
  console.log("Something went wrong for connecting data base please password and link is working or not");
})



