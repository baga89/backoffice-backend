import dotenv from 'dotenv';

// Load values from .env file
dotenv.config();

/**
 * If there is no .env file in production
 * dotenv will fail silently so it would not affect
 * the running of the app
 */

// https://www.npmjs.com/package/dotenv
// https://github.com/motdotla/dotenv/issues/133
// https://stackabuse.com/managing-environment-variables-in-node-js-with-dotenv/
