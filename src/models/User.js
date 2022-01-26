const mongoose = require("mongoose");
const { isEmail } = require("validator");
const { hash, compare } = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "والله الاسم مطلوب"],
  },
  email: {
    type: String,
    validate: {
      validator: (val) => {
        return isEmail(val);
      },
    },
  },
  password: String,
});

UserSchema.pre("save", async function () {
  return (this.password = await hash(this.password, 10));
});

UserSchema.methods.comparePassword = async function (pass) {
  return await compare(pass, this.password);
};

module.exports = mongoose.model("User", UserSchema);
