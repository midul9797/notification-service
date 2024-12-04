import express, { Application, Request, Response } from 'express'; // Import Express and its types
import cors from 'cors'; // Import CORS middleware for cross-origin resource sharing
import httpStatus from 'http-status'; // Import HTTP status codes
import globalErrorHandler from './app/middlewares/globalErrorHandler'; // Import global error handler middleware
import router from './app/routes'; // Import application routes
import cookieParser from 'cookie-parser'; // Import cookie parser middleware
import bodyParser from 'body-parser'; // Import body parser middleware

// Create an Express application instance
const app: Application = express();

// Middleware to parse JSON bodies with a size limit
app.use(bodyParser.json({ limit: '50mb' }));
// Middleware to parse URL-encoded bodies with a size limit and extended syntax
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// CORS middleware configuration for cross-origin requests
app.use(
  cors({
    origin: '*', // Allow all origins
    credentials: true, // Enable credentials for requests
  }),
);

// Middleware to parse cookies
app.use(cookieParser());
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Mount application routes
app.use('/api/v1', router);
// Global error handler middleware
app.use(globalErrorHandler);

// Middleware to handle 404 errors
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: '.',
        message: 'API not found',
      },
    ],
  });
});

// Export the Express application instance
export default app;
