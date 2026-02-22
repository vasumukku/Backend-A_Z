const express = require("express");


const validateEditProfileData =(req)=>{
  const allowededitfields=[
    "firstName",
    "lastName",
    "emailId",
    "skills"  
  ] 

  const editallowed = Object.keys(req.body).
  every((field) => allowededitfields.includes(field));

  if (!editallowed) {
    throw new Error("Invalid updates! Only firstName, lastName, emailId and skills can be updated.");
  }

  return editallowed;
}

module.exports = {
  validateEditProfileData
}
