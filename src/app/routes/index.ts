import express from 'express'; // Import express for routing
import { NotificationRoutes } from './notification.route'; // Import routes for notification

const router = express.Router(); // Create a new express router

// Define an array of routes with their paths and corresponding routes
const moduleRoutes = [
  {
    path: '/notification', // Path for the notification route
    route: NotificationRoutes, // The route for handling notifications
  },
];
// Iterate over the defined routes and use them with their paths
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router; // Export the router for use in the application
