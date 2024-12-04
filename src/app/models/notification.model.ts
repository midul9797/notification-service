import { Schema, model } from 'mongoose';
import {
  INotification,
  NotificationModel,
} from '../interfaces/notification.interface';

// Define the schema for the notification model
const notificationSchema = new Schema<INotification, NotificationModel>(
  {
    userId: { type: String, required: true }, // The user ID to whom the notification is sent
    type: { type: String, enum: ['email', 'sms', 'none'], required: true }, // The type of notification to send

    message: { type: String, required: true }, // The message to be sent
    read: { type: Boolean, required: true }, // Indicates if the notification has been read
  },
  { timestamps: true }, // Automatically add createdAt and updatedAt fields
);
// Create the Notification model from the schema
export const Notification = model<INotification, NotificationModel>(
  'notification', // The name of the collection in the database
  notificationSchema, // The schema for the collection
);
