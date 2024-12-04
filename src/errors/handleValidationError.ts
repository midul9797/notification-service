import mongoose from 'mongoose'; // Import mongoose for error handling
import { IGenericErrorMessage } from '../interfaces/error'; // Import IGenericErrorMessage for error message structure
import { IGenericErrorResponse } from '../interfaces/common'; // Import IGenericErrorResponse for error response structure

// Function to handle mongoose validation errors and return a formatted error response
const handleValidationError = (
  error: mongoose.Error.ValidationError, // The validation error to be handled
): IGenericErrorResponse => {
  // Map over the error's errors object to extract path and message for each error
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return { path: el?.path, message: el?.message }; // Return an object with path and message for each error
    },
  );
  // Define the HTTP status code for the error response
  const statusCode = 400;
  // Return the formatted error response
  return {
    statusCode,
    message: 'Validation Error', // General error message
    errorMessages: errors, // Array of specific error messages
  };
};
// Export the handleValidationError function for external use
export default handleValidationError;
