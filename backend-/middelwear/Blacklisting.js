const Redis  = require("ioredis")
// const redis =new Redis();
const redis=new Redis({
    port:14265, // Redis port
    host: "redis-14265.c305.ap-south-1-1.ec2.cloud.redislabs.com", // Redis host
    username: "default", // needs Redis >= 6
    password: "Yiq5dRFWtHpI2MaHW0ilD6UyFFXU5H4G",
    db: 0, // Defaults to 0
  });
// redis.set("name","masai");

// redis.get("name",(err,result)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log(result)
// })



function setToken (token){
    redis.set(token, true, (err, reply) => {
        if (err) {
            console.log(err);
        }
    });
}

function gettoken(token,callback){
    redis.exists(token, (err, reply) => {
        if (err) {
            console.log(err);
            callback(false);
        } else {
          if (reply === 1) {
              // The token is present in Redis
              callback(true);
            } else {
            // The token is not present in Redis or the array
            callback(false);
          }
        }
      });
    }
    
//     setToken ("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYW5la2lzaG9yMjEyQGdtYWlsLmNvbSIsInJvbGUiOiJwYXRpZW50IiwiaWF0IjoxNjc3NjQzNzg0LCJleHAiOjE2Nzc3MzAxODR9.SjNM0wYRCk_IWRsr7X0N0vxj0WOu4y9fX6oNvicSsso")
// gettoken(token, (isBlacklisted) => {
//     console.log(isBlacklisted);
//   })


    module.exports={redis,setToken,gettoken}

