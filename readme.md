# Notification Service

## Explanation Video:

https://drive.google.com/file/d/1uea1MB2D8J8lyGyiItUnDr70PsvKLdOo/view?usp=sharing

## Prerequisites

- Node.js (version 20 or later)
- npm or yarn
- Redis(Port: 6379)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/midul9797/api-gateway.git
cd api-gateway
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

1. Rename `envfile.example` to `.env`
2. It contains the required environment variables

### 4. Start Server

```bash
npm start
# or
yarn start
# Project Documentation


---

## Root Files and Directories

- **`.env`**: Contains environment variables for the application.
- **`.eslintignore`**: Specifies files and directories to be ignored by ESLint.
- **`.eslintrc`**: Configuration for ESLint.
- **`.gitignore`**: Specifies files and directories to be ignored by Git.
- **`.prettierrc`**: Configuration for Prettier.
- **`package-lock.json`**: Automatically generated for locking dependencies.
- **`package.json`**: Manages project dependencies and scripts.
- **`readme.md`**: Documentation for the project.

---

## Project Directory Structure

### `src/`

The core code of the application resides here.

#### `app/`

- **`controllers/`**
  - `notification.controller.ts`: Handles the logic for notification-related endpoints.
- **`interfaces/`**
  - `notification.interface.ts`: Defines TypeScript interfaces for notifications.
- **`middlewares/`**
  - `auth.ts`: Middleware for authentication.
  - `globalErrorHandler.ts`: Centralized error handling middleware.
  - `validateRequest.ts`: Middleware for request validation.
- **`models/`**
  - `notification.model.ts`: Defines the Mongoose schema and model for notifications.
- **`routes/`**
  - `index.ts`: Main route handler.
  - `notification.route.ts`: Routes for notification-related endpoints.
- **`services/`**
  - `notification.service.ts`: Contains business logic for notifications.
- **`validations/`**
  - `notification.validation.ts`: Validation schemas for notifications.

#### `config/`

- **`index.ts`**: Centralized configuration for the application.

#### `errors/`

- **`ApiError.ts`**: Custom error class for API errors.
- **`handleValidationError.ts`**: Utility for handling validation errors.

#### `helpers/`

- **`jwtHelpers.ts`**: Utilities for working with JSON Web Tokens.

#### `interfaces/`

- **`common.ts`**: Common interfaces used throughout the application.
- **`error.ts`**: Interfaces for error handling.

#### `shared/`

- **`catchAsync.ts`**: Utility for wrapping asynchronous functions with error handling.
- **`nodeMailer.ts`**: Helper for sending emails using NodeMailer.
- **`redis.ts`**: Helper for Redis integration.
- **`sendResponse.ts`**: Standardized response helper.

---

### Other Files

- **`app.ts`**: Initializes and configures the Express application.
- **`server.ts`**: Starts the server.
- **`tsconfig.json`**: TypeScript configuration file.

---

### **Notification Service API Documentation**

This document describes the endpoints for the Notification Service API, allowing operations such as creating, retrieving, and updating notifications.

---

## **Base URL**

```

http://localhost:4004/api/v1

````

---

## **Endpoints**

### **1. Create Notification**

- **Method:** `POST`
- **Endpoint:** `/notification/push`
- **Description:** Create a new notification.

#### Request

**Headers:**

```json
{
  "Authorization": "<your-token>"
}
````

**Body:**

```json
{
  "message": "This is a test notification.",
  "type": "email",
  "read": false
}
```

#### Response

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Notification pushed successfully",
  "data": {
    "userId": "user_2pV06E4EwhAP5JWnPp6QdrhH7qr",
    "type": "email",
    "message": "This is a test notification.",
    "read": false,
    "_id": "675029c806a84783d031b3f1",
    "createdAt": "2024-12-04T10:07:04.317Z",
    "updatedAt": "2024-12-04T10:07:04.317Z",
    "__v": 0
  }
}
```

---

### **2. Get Notifications from Cache**

- **Method:** `GET`
- **Endpoint:** `/notification/cache`
- **Description:** Retrieve notifications from Redis cache.

#### Request

**Headers:**

```json
{
  "Authorization": "<your-token>"
}
```

#### Response

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Notifications Cache retrieved successfully!!!",
  "data": [
    {
      "userId": "user_2pV06E4EwhAP5JWnPp6QdrhH7qr",
      "type": "email",
      "message": "This is a test notification.",
      "read": false,
      "_id": "675029c806a84783d031b3f1",
      "createdAt": "2024-12-04T10:07:04.317Z",
      "updatedAt": "2024-12-04T10:07:04.317Z",
      "__v": 0
    }
  ]
}
```

---

### **3. Get Notifications**

- **Method:** `GET`
- **Endpoint:** `/notification`
- **Description:** Retrieve all notifications from the database.

#### Request

**Headers:**

```json
{
  "Authorization": "<your-token>"
}
```

#### Response

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Notification retrieved successfully!!!",
  "data": [
    {
      "_id": "674ed885582743b4df06dd59",
      "userId": "user_2pV06E4EwhAP5JWnPp6QdrhH7qr",
      "type": "none",
      "message": "A new booking has been scheduled for December 4th, 2024 06:08",
      "read": false,
      "createdAt": "2024-12-03T10:08:05.081Z",
      "updatedAt": "2024-12-03T10:08:05.081Z",
      "__v": 0
    }
  ]
}
```

---

### **4. Update Notifications in Database**

- **Method:** `PATCH`
- **Endpoint:** `/notification`
- **Description:** Update a notification's status in the database.

#### Request

**Headers:**

```json
{
  "Authorization": "<your-token>"
}
```

**Body:**

```json
{
  "notificationId": "675029c806a84783d031b3f1",
  "read": true
}
```

#### Response

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Notification updated successfully",
  "data": null
}
```

---

## **Authentication**

All endpoints require an `Authorization` header with a JWT token:

```json
{
  "Authorization": " <your-token>"
}
```

---

# Notification Services Unit Test Cases

## `createNotificationInDB` Service Tests

### Positive Test Cases

1. **Successful Notification Creation**

   - Input:
     - Valid notification payload
     - User email
     - User name
   - Expected Outcomes:
     - Notification created in database
     - `sendNotification` called with correct parameters
     - Email sent when type is 'email'
     - Redis cache updated with notification

2. **Email Notification Verification**

   - Input:
     - Notification payload with type 'email'
     - Valid email and name
   - Expected Outcomes:
     - Email sent with correct:
       - From address
       - To address
       - Subject
       - Text and HTML content
     - Email contains user name and message

3. **Non-Email Notification Creation**
   - Input:
     - Notification payload with type other than 'email'
   - Expected Outcomes:
     - Notification created successfully
     - No email sent
     - Redis cache updated

### Negative Test Cases

4. **Notification Creation Failure**
   - Input: Invalid or incomplete notification payload
   - Expected Outcomes:
     - `ApiError` thrown with status `BAD_REQUEST`
     - No notification created in database
     - No email sent
     - No Redis cache update

## `getNotificationsFromDB` Service Tests

### Positive Test Cases

5. **Retrieve User Notifications**

   - Input: Valid user ID with multiple notifications
   - Expected Outcomes:
     - Array of notifications returned
     - Notifications sorted by creation time (descending)
     - All returned notifications match user ID

6. **Retrieve Empty Notifications**
   - Input: User ID with no notifications
   - Expected Outcomes:
     - Empty array returned
     - No errors thrown

### Negative Test Cases

7. **Retrieve Notifications for Invalid User**
   - Input: Non-existent or invalid user ID
   - Expected Outcomes:
     - `ApiError` thrown with status `BAD_REQUEST`
     - Error message: "Failed to get notifications"

## `getNotificationsFromRedisCache` Service Tests

### Positive Test Cases

8. **Retrieve Notifications from Redis**
   - Input: User ID with cached notifications
   - Expected Outcomes:
     - Notifications retrieved from Redis
     - Returned notifications match cached data

### Negative Test Cases

9. **No Notifications in Redis Cache**
   - Input: User ID with no cached notifications
   - Expected Outcomes:
     - `ApiError` thrown with status `BAD_REQUEST`
     - Error message: "Failed to get notifications"

## `updateNotificationsInDB` Service Tests

### Positive Test Cases

10. **Successful Notification Update**
    - Input:
      - Valid notification ID
      - Partial update data
    - Expected Outcomes:
      - Notification updated successfully
      - Update method called with correct parameters
      - Returns `true`

### Negative Test Cases

11. **Update Non-Existent Notification**
    - Input:
      - Invalid notification ID
      - Update payload
    - Expected Outcomes:
      - `ApiError` thrown with status `BAD_REQUEST`
      - Error message: "Failed to get notifications"
