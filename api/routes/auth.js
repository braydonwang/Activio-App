const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      name: `${req.body.firstName} ${req.body.lastName}`,
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    const token = generateToken(user._id);

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(400).json("Wrong Credentials!");
      return;
    }

    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate) {
      res.status(400).json("Wrong Credentials!");
      return;
    }

    const token = generateToken(user._id);

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json(err);
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = router;
