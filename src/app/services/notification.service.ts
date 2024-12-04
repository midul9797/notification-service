/* eslint-disable no-console */
import httpStatus from 'http-status'; // Import httpStatus for HTTP status codes
import ApiError from '../../errors/ApiError'; // Import ApiError for API error handling
import { INotification } from '../interfaces/notification.interface'; // Import INotification interface for notification structure
import { Notification } from '../models/notification.model'; // Import Notification model for database operations
import sendNotification from '../../server'; // Import sendNotification function for sending notifications
import { transporter } from '../../shared/nodeMailer'; // Import transporter for sending emails
import { RedisClient } from '../../shared/redis'; // Import RedisClient for Redis operations

/**
 * Creates a new notification in the database and sends it to the user if the type is 'email'.
 * @param payload - The notification payload.
 * @param email - The recipient's email address.
 * @param name - The recipient's name.
 * @returns The created notification or null if creation fails.
 */
const createNotificationInDB = async (
  payload: INotification,
  email: string,
  name: string,
): Promise<INotification | null> => {
  const createdNotification = await Notification.create(payload);
  if (!createdNotification)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to upload notification');

  // Send the notification to the user if the type is 'email'
  sendNotification(payload.userId, createdNotification);

  if (payload.type === 'email') {
    transporter.sendMail({
      from: '"Moklasur Rahman 👻" <butterflynso9797@gmail.com>',
      to: email,
      subject: 'Notification from Pulikidz',
      text: `Hello ${name},\n\n${payload.message}\n\nBest Regards,\nPuliKidz `,
      html: `<div style='font-family: Arial, sans-serif; line-height: 1.5;'>
      <h2 style='color: #333;'>Notification</h2>
      <p>Hello,<strong>${name}</strong></p>
      <p>${payload.message}</p>
      <p>Best Regards,</p>
      <p><strong>Pulikidz</strong></p>
    </div>`,
    });
  }
  // Store the notification in Redis for caching
  RedisClient.setNotification(
    createdNotification.userId,
    JSON.stringify(createdNotification),
  );
  return createdNotification;
};

/**
 * Retrieves notifications from the database for a given user.
 * @param userId - The user's ID.
 * @returns An array of notifications or null if retrieval fails.
 */
const getNotificationsFromDB = async (
  userId: string,
): Promise<INotification[] | null> => {
  const notifications = await Notification.find({ userId }).sort({
    createdAt: -1,
  });
  if (!notifications)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get notifications');
  return notifications;
};

/**
 * Retrieves notifications from the Redis cache for a given user.
 * @param userId - The user's ID.
 * @returns An array of notifications or null if retrieval fails.
 */
const getNotificationsFromRedisCache = async (
  userId: string,
): Promise<INotification[] | null> => {
  const notifications = await RedisClient.getNotification(userId);
  if (!notifications)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get notifications');
  return notifications;
};

/**
 * Updates a notification in the database.
 * @param notificationId - The ID of the notification to update.
 * @param data - The partial data to update the notification with.
 * @returns A boolean indicating success or null if update fails.
 */
const updateNotificationsInDB = async (
  notificationId: string,
  data: Partial<INotification>,
): Promise<boolean | null> => {
  const notifications = await Notification.findOneAndUpdate({
    id: notificationId,
    data,
  });
  if (!notifications)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get notifications');
  return true;
};

// Export the notification services
export const notificationServices = {
  createNotificationInDB,
  getNotificationsFromDB,
  getNotificationsFromRedisCache,
  updateNotificationsInDB,
};
