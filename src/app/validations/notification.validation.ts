import { z } from 'zod'; // Import zod for schema validation

// Define the schema for creating a notification
const createNotificationZodSchema = z.object({
  body: z.object({
    message: z.string(), // The message to be sent
    type: z.enum(['email', 'sms', 'none']), // The type of notification to send
    read: z.boolean(), // Indicates if the notification has been read
  }),
});

// Export the validation schema for creating a notification
export const notificationValidation = {
  createNotificationZodSchema,
};
