const  mongoose  = require("mongoose");


require("dotenv").config();

const mongourl= process.env.mongourl 
// console.log('mongourl: ', mongourl);
const connection =mongoose.connect(mongourl)

module.exports={connection}
