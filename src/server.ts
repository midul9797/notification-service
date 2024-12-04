/* eslint-disable no-console */
import mongoose from 'mongoose';
import config from './config';
import app from './app';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { RedisClient } from './shared/redis';
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});
async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('DB connected');
    await RedisClient.connect();
    io.on('connection', (socket: Socket) => {
      console.log('New client connected:', socket.id);

      socket.on('subscribe', (userId: string) => {
        socket.join(userId); // Join a room specific to the user
        console.log(`User ${userId} joined room.`);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
    server.listen(config.port, () => {
      console.log('server running');
    });
  } catch (error) {
    console.log('Failed to connect' + error);
  }
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else process.exit(1);
  });
}
boostrap();
const sendNotification = (userId: string, notification: any) => {
  io.to(userId).emit('notification', notification);
};
process.on('SIGTERM', error => {
  console.log('SIGTERM recieved' + error);
  if (server) server.close();
});
export default sendNotification;
