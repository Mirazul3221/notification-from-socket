import { Server } from "socket.io";

const io = new Server({
    cors:{origin:"http://localhost:5173"}
 });

 let onlineUsers = []
 const addUsers = (username,socketId)=>{
    !onlineUsers.some(user => user.username === username) && onlineUsers.push({username,socketId})
    // console.log(onlineUsers)
 }

 const removeUsers = (socketId)=>{
    onlineUsers = onlineUsers.filter((user)=> user.socketId !== socketId)
 }

 const getUser = (username) => {
    return onlineUsers.find((user)=> user.username === username)
 }
io.on("connection", (socket) => {
  console.log('Someone is connected')
  socket.on("newUser",(userName)=>{
    addUsers(userName,socket.id)
  })
  socket.on("sendNotification",({senderName,receperName,type})=>{
    console.log(senderName, receperName, type)
    const user = getUser(receperName)
    io.to(user?.socketId).emit("getNotification",{senderName,type})
  })
  io.emit("first","this is first event")
  socket.on("disconnect",()=>{
   removeUsers(socket.id)
  })

  socket.on("Hello",(msg)=>{
    console.log(msg)
  })

});

io.listen(3000);//