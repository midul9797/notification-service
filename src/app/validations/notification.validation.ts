import { z } from 'zod';

const createNotificationZodSchema = z.object({
  body: z.object({
    message: z.string(),
    type: z.enum(['email', 'sms', 'none']),
    read: z.boolean(),
  }),
});

export const notificationValidation = {
  createNotificationZodSchema,
};
