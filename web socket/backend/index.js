import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
const app = express();

const server = createServer(app);
const io = new Server(server, { cors: '*' });
const port = 3000;

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);

io.on('connection', (socket) => {
  console.log('user connected', socket.id);
  socket.on('chat', (data) => {
    console.log("message from client", data );
  }); 
});
