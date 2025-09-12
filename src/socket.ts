import { Server } from 'socket.io';
import http from 'http';

let io: Server;

export function initSocket(server: http.Server) {
  io = new Server(server, {
    cors: {
      origin: 'https://document-management-suite-frontend.vercel.app',
    },
  });

  io.on('connection', socket => {
    console.log('New client connected:', socket.id);

    socket.on('subscribe', (userId: string) => {
      socket.join(userId);
      console.log(`User ${userId} joined room.`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
}

export function getIO() {
  if (!io) throw new Error('Socket.IO not initialized yet!');

  return io;
}
