import jwt, { JwtPayload } from 'jsonwebtoken'; // Import jwt and JwtPayload from 'jsonwebtoken' for token decoding

// Function to decode a JSON Web Token (JWT) and return its payload
const decodeToken = (token: string): JwtPayload => {
  return jwt.decode(token) as JwtPayload; // Decode the token and cast the result to JwtPayload
};

// Export an object containing the decodeToken function for external use
export const jwtHelpers = {
  decodeToken, // Expose the decodeToken function
};
