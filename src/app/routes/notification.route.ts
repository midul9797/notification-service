import express from 'express'; // Import express for routing
import validateRequest from '../middlewares/validateRequest'; // Middleware for request validation
import { notificationValidation } from '../validations/notification.validation'; // Validation schema for notifications
import { notificationController } from '../controllers/notification.controller'; // Controller for notification operations
import auth from '../middlewares/auth'; // Middleware for authentication

// Create an instance of the express Router
const router = express.Router();

// Define routes for notification operations
router
  .post(
    '/push', // Route for pushing a new notification
    auth(), // Authenticate the request
    validateRequest(notificationValidation.createNotificationZodSchema), // Validate the request body
    notificationController.createNotification, // Controller function to handle the request
  )
  .get('/cache', auth(), notificationController.getNotificationsFromRedisCache) // Route to get notifications from Redis cache
  .get('/', auth(), notificationController.getNotifications) // Route to get all notifications
  .patch('/', auth(), notificationController.updateNotificationsInDB); // Route to update notifications in the database

// Export the router for use in the application
export const NotificationRoutes = router;
