const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter your email!"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email!"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password!"],
      minlength: [8, "Please enter a password with a minimum of 8 characters!"],
      maxlength: [
        60,
        "Please enter a password less than or equal to 60 characters!",
      ],
      select: false,
    },
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

// INSTANCE METHODS
// --- check for the correct password
UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// STATIC METHODS
// --- find query in DB
UserSchema.statics.valueExists = function (query) {
  return this.findOne(query).then((res) => res);
};

module.exports = mongoose.model("User", UserSchema);
