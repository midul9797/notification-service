import { IGenericErrorMessage } from './error';

// Defines the structure of a generic error response
export type IGenericErrorResponse = {
  statusCode: number; // HTTP status code of the error
  message: string; // A general error message
  errorMessages: IGenericErrorMessage[]; // Array of specific error messages
};

// Defines the structure of a generic response with pagination metadata
export type IGenericResponse<T> = {
  meta: {
    page: number; // Current page number
    limit: number; // Number of items per page
    total: number; // Total number of items
  };
  data: T; // The actual data of the response
};

// Defines the structure of a user request
export type IRequestUser = {
  userId: string; // Unique identifier of the user
};
/**
 * Interface for Clerk authentication token payload
 */
export type ClerkTokenPayload = {
  azp: string; // Authorized party
  clerkId: string; // Unique Clerk user ID
  email: string; // User's email
  exp: number; // Token expiration timestamp
  fva: [number, number]; // Feature version array
  iat: number; // Token issued at timestamp
  iss: string; // Token issuer
  jti: string; // JWT ID
  name: string; // User's name
  nbf: number; // Not before timestamp
  sid: string; // Session ID
  sub: string; // Subject (user identifier)
};
