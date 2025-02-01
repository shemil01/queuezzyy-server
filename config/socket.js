const socketIo = require("socket.io");
let io;


const initializeSocket = (server) => {
    io = socketIo(server, {
      cors: { origin: "*" }, 
    });
    io.on("connection",(socket)=>{
      console.log("A user conncted",socket.id)
    
      socket.on("disconnect",()=>{
        console.log('A user disconnected',socket.id)
      })
    })
    return io;

  
}

module.exports = {
    initializeSocket,
    getIo: () => {
      if (!io) {
        throw new Error("Socket.io not initialized");
      }
      return io;
    },
  };