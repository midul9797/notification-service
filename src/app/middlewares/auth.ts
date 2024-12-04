/* eslint-disable no-console */
import { NextFunction, Response, Request } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import { ClerkTokenPayload } from '../../interfaces/common';

// Function to authenticate requests based on JWT tokens and required roles
const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization;
    // Check if a token is present
    if (!token) {
      // If no token is present, throw an unauthorized error
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    // Initialize a variable to hold the verified user
    let verifiedUser = null;

    // Decode the token to verify the user
    verifiedUser = jwtHelpers.decodeToken(token);
    // Assign the verified user to the request object
    req.user = verifiedUser as ClerkTokenPayload;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If an error occurs, pass it to the next middleware or error handler
    next(error);
  }
};
// Export the authentication middleware
export default auth;
