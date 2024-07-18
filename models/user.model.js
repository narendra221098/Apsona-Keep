const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: true, select: false },
    role: { type: String, default: "user" },
    verified: { type: Boolean, default: false },
    settings: { theme: { type: String, default: "light" } },
  },
  { timestamps: true }
);

//  encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(
    this.password,
    parseInt(process.env.PASS_SALT)
  );
});

//  decrypt password
userSchema.methods.comparedPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// to get jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

module.exports = mongoose.model("User", userSchema);
