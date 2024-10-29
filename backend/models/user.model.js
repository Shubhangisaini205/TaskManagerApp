const { Schema, model, default: mongoose } = require("mongoose");
const userSchema = new Schema(
  {
    first_name: { type: String, required: true },
    lsdt_name: { type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, },
    googleId: { type: String, default: "" },
    
  },
  { strict: true, timestamps: true }
);

const UserModel = model("users", userSchema);

module.exports = UserModel;