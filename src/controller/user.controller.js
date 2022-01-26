const User = require("../models/User");

const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // check user mawgood wla la2
    if (!user) {
      res.status(401).send("invalid email");
      return;
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      res.status(401).send("invalid password");
      return;
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { register, login };
