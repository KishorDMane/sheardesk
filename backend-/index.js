const express=require("express");
const Socket=require("socket.io")
const http=require("http")
const app=express();
const serverHttp=http.createServer(app)
const io=Socket(http)


app.get("/shearedscreen",(req,res)=>{
    res.sendFile(__dirname+`/shearedscreen.html`)
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