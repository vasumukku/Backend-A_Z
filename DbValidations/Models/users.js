const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4
    },

    lastName: {
      type: String
    },

    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough");
        }
      }
    },

    emailId: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      }
    },

    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "others"]   // BETTER way
    },

    skill: {
      type: [String],
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("DBValidations", userSchema);
