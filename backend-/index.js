const { Socket } = require("dgram");
const {Server}=require("socket.io");
const express=require("express");
const http=require("http")
const cors=require("cors")
const {connection}=require("./config/db")
const {SignupRouter}=require("./router/signup.router")
const {LoginRouter}=require("./router/login.router")
const {UserInfoRouter}=require("./router/getuser.router")

const app=express();
const serverHttp=http.createServer(app)
const io=new Server(serverHttp) 
app.use(express.json())
app.use(cors())

app.get("/shearedscreen",(req,res)=>{
    res.sendFile(__dirname+`/test.html`)
})
app.get("/",(req,res)=>{
    res.send("hello")
})

app.use("/signup",SignupRouter)
app.use("/login",LoginRouter)
app.use("/getuserinfo",UserInfoRouter)



io.on("connection",(socket)=>{
    // socket.emit("Kishor","hi Kishor")
    socket.on("join-message",(ID)=>{ 
        socket.join(ID);
        console.log("New Usere joined room:"+ID);
    })  
    socket.on("screen-data",(data)=>{  
        data=JSON.parse(data); 
        var room=data.room;  
        var imgSrc=data.image;
        // socket.broadcast.emit("kishor","hi")
        // socket.broadcast.emit("kishor",imgSrc)
        socket.broadcast.to(room).emit("kishor",imgSrc);

    })
   
})
serverHttp.listen(8000,async()=>{
    await connection
    console.log("listening on 8000 port");
})

