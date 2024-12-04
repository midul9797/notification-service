/* eslint-disable no-console */
import mongoose from 'mongoose'; // Import mongoose for database operations
import config from './config'; // Import configuration file
import app from './app'; // Import Express application
import http from 'http'; // Import HTTP module for server creation
import { Server, Socket } from 'socket.io'; // Import Socket.IO for real-time communication
import { RedisClient } from './shared/redis'; // Import Redis client for caching

// Create an HTTP server with the Express application
const server = http.createServer(app);
// Initialize Socket.IO server with CORS configuration for client connections
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

// Handle uncaught exceptions and exit the process
process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

// Bootstrap function to initialize the server and connections
async function boostrap() {
  try {
    // Connect to MongoDB database
    await mongoose.connect(config.database_url as string);
    console.log('DB connected');
    // Connect to Redis for caching
    await RedisClient.connect();
    // Handle new client connections
    io.on('connection', (socket: Socket) => {
      console.log('New client connected:', socket.id);

      // Handle client subscription to a specific room
      socket.on('subscribe', (userId: string) => {
        socket.join(userId); // Join a room specific to the user
        console.log(`User ${userId} joined room.`);
      });

      // Handle client disconnection
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
    // Start the server and listen on a specific port
    server.listen(config.port, () => {
      console.log('server running');
    });
  } catch (error) {
    console.log('Failed to connect' + error);
  }
  // Handle unhandled promise rejections
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else process.exit(1);
  });
}
// Call the bootstrap function to start the server
boostrap();

// Function to send notifications to a specific user
const sendNotification = (userId: string, notification: any) => {
  io.to(userId).emit('notification', notification);
};

// Handle SIGTERM signal to gracefully close the server
process.on('SIGTERM', error => {
  console.log('SIGTERM recieved' + error);
  if (server) server.close();
});

// Export the sendNotification function
export default sendNotification;
