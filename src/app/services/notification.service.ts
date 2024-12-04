/* eslint-disable no-console */
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { INotification } from '../interfaces/notification.interface';
import { Notification } from '../models/notification.model';
import sendNotification from '../../server';
import { transporter } from '../../shared/nodeMailer';
import { RedisClient } from '../../shared/redis';

const createNotificationInDB = async (
  payload: INotification,
  email: string,
  name: string,
): Promise<INotification | null> => {
  const createdNotification = await Notification.create(payload);
  if (!createdNotification)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to upload notification');

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
  RedisClient.setNotification(
    createdNotification.userId,
    JSON.stringify(createdNotification),
  );
  return createdNotification;
};

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
const getNotificationsFromRedisCache = async (
  userId: string,
): Promise<INotification[] | null> => {
  const notifications = await RedisClient.getNotification(userId);
  if (!notifications)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get notifications');
  return notifications;
};
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

export const notificationServices = {
  createNotificationInDB,
  getNotificationsFromDB,
  getNotificationsFromRedisCache,
  updateNotificationsInDB,
};
