const express=require("express");
const jwt =require("jsonwebtoken")


const UserInfoRouter=express.Router()

UserInfoRouter.get('/', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  console
    if (!token) {
      res.status(401).send('Unauthorized');
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const {  name, email } = decodedToken;
   
      res.send({ name, email });
    } catch (err) {
    //   console.error(err);
     res.status(401).send('Unauthorized a');
    }
  });
  module.exports={UserInfoRouter}

