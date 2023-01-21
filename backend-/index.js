const { Socket } = require("dgram");
const {Server}=require("socket.io");
const express=require("express");
const http=require("http")
const app=express();
const serverHttp=http.createServer(app)
const io=new Server(serverHttp) 

app.get("/shearedscreen",(req,res)=>{
    res.sendFile(__dirname+`/test.html`)
})
app.get("/",(req,res)=>{
    res.send("hello")
})
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
serverHttp.listen(8000,()=>{
    console.log("listening on 8000 port");
})