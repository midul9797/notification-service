import { SetOptions, createClient } from 'redis';
import config from '../config';
import { INotification } from '../app/interfaces/notification.interface';

const redisClient = createClient({
  url: config.redis.url,
});

const redisPubClient = createClient({
  url: config.redis.url,
});

const redisSubClient = createClient({
  url: config.redis.url,
});

redisClient.on('error', error => console.log('RedisError', error));
redisClient.on('connect', error => console.log('Redis Connected'));

const connect = async (): Promise<void> => {
  await redisClient.connect();
  await redisPubClient.connect();
  await redisSubClient.connect();
};

const setNotification = async (
  userId: string,
  token: string
): Promise<void> => {
  const key = `notification:${userId}`;
  await redisClient.lPush(key, token);
  await redisClient.expire(key, Number(config.redis.expires_in));

  await redisClient.lTrim(key, 0, 99);
};

const getNotification = async (
  userId: string
): Promise<INotification[] | null> => {
  const key = `notification:${userId}`;
  const notifications = await redisClient.lRange(key, 0, -1);
  return notifications.map(notification => JSON.parse(notification));
};

const delNotificaiton = async (userId: string): Promise<void> => {
  const key = `notification:${userId}`;
  await redisClient.del(key);
};

const disconnect = async (): Promise<void> => {
  await redisClient.quit();
  await redisPubClient.quit();
  await redisSubClient.quit();
};

export const RedisClient = {
  connect,
  setNotification,
  getNotification,
  delNotificaiton,
  disconnect,
  publish: redisPubClient.publish.bind(redisPubClient),
  subscribe: redisSubClient.subscribe.bind(redisSubClient),
};
