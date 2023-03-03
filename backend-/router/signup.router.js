const express = require("express");
const bcrypt = require("bcrypt");
const { SignupModel } = require("../model/signu.model");

const SignupRouter = express.Router();

SignupRouter.post("/", async (req, res) => {

  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered

    const userExists = await SignupModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Email already registered" });
    }

    bcrypt.hash(password, 10, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" });
      } else {

        const user = new SignupModel({ name, email, password: hash });
        await user.save();
        res.json(user);
      }

    });
    // Create the user
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = { SignupRouter };



