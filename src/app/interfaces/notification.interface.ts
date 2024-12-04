import { Model, Types } from 'mongoose';

export type INotification = {
  _id?: string; // id of the file is optional because initially there will be no id.
  userId: string; // The name of the file
  type: 'email' | 'sms' | 'none'; // The format of the file (e.g., .txt, .pdf, .docx)
  message: string;
  read: boolean;
};
export type NotificationModel = Model<INotification>;
