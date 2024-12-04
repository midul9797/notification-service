import { Schema, model } from 'mongoose';
import {
  INotification,
  NotificationModel,
} from '../interfaces/notification.interface';

const notificationSchema = new Schema<INotification, NotificationModel>(
  {
    userId: { type: String, required: true },
    type: { type: String, enum: ['email', 'sms', 'none'], required: true },

    message: { type: String, required: true },
    read: { type: Boolean, required: true },
  },
  { timestamps: true },
);
export const Notification = model<INotification, NotificationModel>(
  'notification',
  notificationSchema,
);
