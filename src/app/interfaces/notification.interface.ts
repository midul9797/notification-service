import { Model, Types } from 'mongoose';

// Defines the structure of a notification document in the database
export type INotification = {
  _id?: string; // The unique identifier for the notification, optional because it's assigned by MongoDB
  userId: string; // The identifier of the user who will receive the notification
  type: 'email' | 'sms' | 'none'; // Specifies the type of notification to be sent
  message: string; // The content of the notification
  read: boolean; // Indicates if the notification has been read by the user
};

// Defines the model for the notification collection in the database
export type NotificationModel = Model<INotification>;
