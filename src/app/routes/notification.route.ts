import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { notificationValidation } from '../validations/notification.validation';
import { notificationController } from '../controllers/notification.controller';
import auth from '../middlewares/auth';
// import auth from '../../middlewares/auth';
const router = express.Router();

router
  .post(
    '/push',
    auth(),
    validateRequest(notificationValidation.createNotificationZodSchema),
    notificationController.createNotification,
  )
  .get('/cache', auth(), notificationController.getNotificationsFromRedisCache)
  .get('/', auth(), notificationController.getNotifications)
  .patch('/', auth(), notificationController.updateNotificationsInDB);

export const NotificationRoutes = router;
