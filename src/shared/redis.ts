import { createClient } from 'redis'; // Import createClient from 'redis' for creating Redis clients
import config from '../config'; // Import configuration file
import { INotification } from '../app/interfaces/notification.interface'; // Import INotification interface for type checking

// Create Redis clients for different operations
const redisClient = createClient({
  url: config.redis.url, // Use the URL from the configuration file
});

const redisPubClient = createClient({
  url: config.redis.url, // Use the URL from the configuration file
});

const redisSubClient = createClient({
  url: config.redis.url, // Use the URL from the configuration file
});

// Handle Redis client errors and connections
redisClient.on('error', error => console.log('RedisError', error));
redisClient.on('connect', error => console.log('Redis Connected'));

// Function to connect all Redis clients
const connect = async (): Promise<void> => {
  await redisClient.connect(); // Connect the main Redis client
  await redisPubClient.connect(); // Connect the Redis client for publishing
  await redisSubClient.connect(); // Connect the Redis client for subscribing
};

// Function to set a notification for a user
const setNotification = async (
  userId: string,
  token: string,
): Promise<void> => {
  const key = `notification:${userId}`; // Construct the key for the notification
  await redisClient.lPush(key, token); // Push the token to the left of the list
  await redisClient.expire(key, Number(config.redis.expires_in)); // Set expiration time for the key

  await redisClient.lTrim(key, 0, 99); // Trim the list to keep only the last 100 elements
};

// Function to get notifications for a user
const getNotification = async (
  userId: string,
): Promise<INotification[] | null> => {
  const key = `notification:${userId}`; // Construct the key for the notification
  const notifications = await redisClient.lRange(key, 0, -1); // Get all elements from the list
  return notifications.map(notification => JSON.parse(notification)); // Parse each notification from JSON string
};

// Function to delete notifications for a user
const delNotificaiton = async (userId: string): Promise<void> => {
  const key = `notification:${userId}`; // Construct the key for the notification
  await redisClient.del(key); // Delete the key
};

// Function to disconnect all Redis clients
const disconnect = async (): Promise<void> => {
  await redisClient.quit(); // Quit the main Redis client
  await redisPubClient.quit(); // Quit the Redis client for publishing
  await redisSubClient.quit(); // Quit the Redis client for subscribing
};

// Export the RedisClient object with methods for connection, setting notifications, getting notifications, deleting notifications, disconnecting, publishing, and subscribing
export const RedisClient = {
  connect,
  setNotification,
  getNotification,
  delNotificaiton,
  disconnect,
  publish: redisPubClient.publish.bind(redisPubClient), // Bind the publish method to the redisPubClient
  subscribe: redisSubClient.subscribe.bind(redisSubClient), // Bind the subscribe method to the redisSubClient
};
