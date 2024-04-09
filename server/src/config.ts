import { get } from 'env-var';

import { loadEnv } from './env';

/**
 * Loads environment variables from the system environment or a .env file.
 * This function must be called before accessing any configuration values.
 */
loadEnv();

/**
 * Retrieves the value of the specified environment variable and marks it as required.
 *
 * @param env - The name of the environment variable to retrieve.
 * @returns The value of the specified environment variable as a string.
 */
export const getRequired = (env: string) => get(env).required();

/**
 * Retrieves the value of the specified environment variable if it exists, or returns an empty string as default.
 *
 * @param env - The name of the environment variable to retrieve.
 * @returns The value of the environment variable or an empty string if not found.
 */

export const getOptional = (env: string) => get(env).default('');

export const config = {
  /**
   * Retrieves the required value of the 'DATABASE_URL' environment variable as a string.
   */
  get databaseUri() {
    return getRequired('DATABASE_URL').asString();
  },

  // get databasePoolUri() {
  //   return getRequired('DATABASE_POOL_URL').asString();
  // },

  get serverPort() {
    return getRequired('SERVER_PORT').asInt();
  },

  get jwtSecretKey() {
    return getRequired('JWT_SECRET_KEY').asString();
  },

  get jwtRefreshKey() {
    return getRequired('JWT_REFRESH_KEY').asString();
  },
};
