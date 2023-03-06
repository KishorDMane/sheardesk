// Import Express and Redis libraries
const express = require("express");

// Create Redis client
const  {redis, setToken}=require('../middelwear/Blacklisting')

// Create Express router
const LogoutRouter = express.Router();

// Define the logout route
LogoutRouter.post("/", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    setToken(token);
    res.status(200).send("Logout Successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while logging out");
  }
});

// Export the router
module.exports = {LogoutRouter};
