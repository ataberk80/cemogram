
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('Yeni bağlantı:', socket.id);

  socket.on('joinRoom', ({ roomId, user }) => {
    socket.join(roomId);
    console.log(`${user.name} joined ${roomId}`);
  });

  socket.on('message', ({ roomId, message }) => {
    io.to(roomId).emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Bağlantı kesildi:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Cemogram sunucusu ${PORT} portunda çalışıyor`));
