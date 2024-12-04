import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import { INotification } from '../interfaces/notification.interface';
import { notificationServices } from '../services/notification.service';
const createNotification = catchAsync(async (req: Request, res: Response) => {
  const notification = req.body;
  const { clerkId, email, name } = req.user;
  const result = await notificationServices.createNotificationInDB(
    {
      ...notification,
      userId: clerkId,
    },
    email,
    name,
  );
  sendResponse<INotification>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification pushed successfully',
    data: result,
  });
});

const getNotifications = catchAsync(async (req: Request, res: Response) => {
  const { clerkId } = req.user;
  const result = await notificationServices.getNotificationsFromDB(clerkId);
  sendResponse<INotification[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification retrived successfully!!!',
    data: result || null,
  });
});
const getNotificationsFromRedisCache = catchAsync(
  async (req: Request, res: Response) => {
    const { clerkId } = req.user;
    const result =
      await notificationServices.getNotificationsFromRedisCache(clerkId);
    sendResponse<INotification[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Notifications Cache retrived successfully!!!',
      data: result || null,
    });
  },
);
const updateNotificationsInDB = catchAsync(
  async (req: Request, res: Response) => {
    const { notificationId } = req.params;

    const result = await notificationServices.updateNotificationsInDB(
      notificationId,
      req.body,
    );
    sendResponse<INotification[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Notification retrived successfully!!!',
    });
  },
);

export const notificationController = {
  createNotification,
  getNotifications,
  getNotificationsFromRedisCache,
  updateNotificationsInDB,
};
