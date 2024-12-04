import express from 'express';
import { NotificationRoutes } from './notification.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/notification',
    route: NotificationRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
