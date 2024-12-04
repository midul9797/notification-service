import dotenv from 'dotenv'; // Import dotenv to load environment variables
import path from 'path'; // Import path to manipulate file paths

// Load environment variables from the .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

// Export configuration object with environment variables
export default {
  env: process.env.NODE_ENV, // Environment variable for the application environment
  port: process.env.PORT, // Environment variable for the server port
  database_url: process.env.DATABASE_URL, // Environment variable for the database URL
  redis: {
    url: process.env.REDIS_URL, // Environment variable for the Redis URL
    expires_in: process.env.REDIS_CACHE_EXPIRE, // Environment variable for Redis cache expiration time
  },
};
