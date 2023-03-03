const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SignupModel } = require("../model/signu.model");

const LoginRouter = express.Router();

LoginRouter.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists with that email
        const user = await SignupModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }


        // Check if the password is correct
        const hash = user.password

        bcrypt.compare(password, hash, function (err, result) {
            // result == true
            if (err) {
                console.log(err)
                res.status(500).json({ error: "Internal server error" });
            } else if (result == false) {
                return res.status(401).json({ error: "Invalid credentials" });
            } else {

                // Generate a JWT token
                const token = jwt.sign(
                    { userId: user._id, email: user.email, name: user.name },
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' }
                  );
                  
                // Send the token in the response
                res.json({ token });
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = { LoginRouter };
