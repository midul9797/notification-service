import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync'; // Import catchAsync to handle async errors
import sendResponse from '../../shared/sendResponse'; // Import sendResponse to send a formatted response
import httpStatus from 'http-status'; // Import httpStatus for HTTP status codes
import { INotification } from '../interfaces/notification.interface'; // Import INotification interface
import { notificationServices } from '../services/notification.service'; // Import notificationServices for database operations
import { ClerkTokenPayload } from '../../interfaces/common';

// Function to create a new notification
const createNotification = catchAsync(async (req: Request, res: Response) => {
  const notification = req.body; // Extract notification details from request body
  // Extract user details from the request object
  const { clerkId, email, name } = req.user as ClerkTokenPayload;
  // Create a new notification in the database with user details
  const result = await notificationServices.createNotificationInDB(
    {
      ...notification,
      userId: clerkId,
    },
    email,
    name,
  );
  // Send a success response with the created notification
  sendResponse<INotification>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification pushed successfully',
    data: result,
  });
});

// Function to retrieve all notifications for a user
const getNotifications = catchAsync(async (req: Request, res: Response) => {
  const { clerkId } = req.user as ClerkTokenPayload; // Extract clerkId from the request object
  // Retrieve all notifications for the user from the database
  const result = await notificationServices.getNotificationsFromDB(clerkId);
  // Send a success response with the retrieved notifications
  sendResponse<INotification[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification retrived successfully!!!',
    data: result || null,
  });
});

// Function to retrieve notifications from Redis cache
const getNotificationsFromRedisCache = catchAsync(
  async (req: Request, res: Response) => {
    const { clerkId } = req.user as ClerkTokenPayload; // Extract clerkId from the request object
    // Retrieve notifications from Redis cache for the user
    const result =
      await notificationServices.getNotificationsFromRedisCache(clerkId);
    // Send a success response with the retrieved notifications from cache
    sendResponse<INotification[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Notifications Cache retrived successfully!!!',
      data: result || null,
    });
  },
);

// Function to update a notification in the database
const updateNotificationsInDB = catchAsync(
  async (req: Request, res: Response) => {
    const { notificationId } = req.params; // Extract notificationId from request parameters
    // Update the notification in the database with the provided details
    const result = await notificationServices.updateNotificationsInDB(
      notificationId,
      req.body,
    );
    // Send a success response indicating the update was successful
    sendResponse<INotification[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Notification retrived successfully!!!',
    });
  },
);

// Export the notification controller functions
export const notificationController = {
  createNotification,
  getNotifications,
  getNotificationsFromRedisCache,
  updateNotificationsInDB,
};
