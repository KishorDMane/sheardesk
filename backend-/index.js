const { Socket } = require("dgram");
const {Server}=require("socket.io");
const express=require("express");
const http=require("http")
const app=express();
const serverHttp=http.createServer(app)
const io=new Server(serverHttp) 

app.get("/shearedscreen",(req,res)=>{
    res.sendFile(__dirname+`/shearedscreen.html`)
})
app.get("/",(req,res)=>{
    res.send("hello")
})
io.on("connection",(socket)=>{
    socket.on("join-member",(ID)=>{
        socket.join(ID);
        console.log("New Usere joined room:"+ID);
    })
    socket.on("sheared-screen",(data)=>{
        data=JSON.parse(data);
        const room=data.room;
        const imgSrc=data.image;
        socket.brodcast.to(room).emit("sheared-screen",imgSrc);
    })
   
})
serverHttp.listen(8000,()=>{
    console.log("listening on 8000 port");
})