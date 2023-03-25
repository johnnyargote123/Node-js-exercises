import { Server } from "socket.io";

const socket = {};

socket.connect = (httpServer) => {
  socket.io = new Server(httpServer);
  let { io } = socket;
  io.on("connection", (clientSocket) => {
    console.log(`${clientSocket.id} conectado`)
  });
};

socket.io = Server;

export default socket;