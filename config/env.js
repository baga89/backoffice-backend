import dotenv from 'dotenv';

// Configure env variables
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// https://www.npmjs.com/package/dotenv
// https://github.com/motdotla/dotenv/issues/133
