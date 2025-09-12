/* eslint-disable no-console */
import mongoose from 'mongoose'; // Import mongoose for database operations
import config from './config'; // Import configuration file
import app from './app'; // Import Express application
import http from 'http'; // Import HTTP module for server creation
import { Server, Socket } from 'socket.io'; // Import Socket.IO for real-time communication
import { RedisClient } from './shared/redis'; // Import Redis client for caching
import { initSocket } from './socket';

// Create an HTTP server with the Express application
const server = http.createServer(app);
// Initialize Socket.IO server with CORS configuration for client connections
const io = initSocket(server);

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

// Handle SIGTERM signal to gracefully close the server
process.on('SIGTERM', error => {
  console.log('SIGTERM recieved' + error);
  if (server) server.close();
});
