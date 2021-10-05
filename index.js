import express from 'express';
import './utils/env.js'; // Keep this at the top
import { connectDB } from './config/db.js';
import cors from 'cors';
import officesRoutes from './routes/api/offices.js';
import authRoute from './routes/api/auth.js';
import usersRoute from './routes/api/users.js';
import { errorHandler } from './middleware/error.js';
import { ErrorResponse } from './utils/errorResponse.js';
import winston from 'winston';
import cookieParser from 'cookie-parser';

// Connect to database
connectDB();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Logger
winston.add(new winston.transports.File({ filename: 'logfile.log', timestamp: true }));

// Define Routes
app.get('/', (req, res, next) => {
  // res.send("Hello World!");
  next(new ErrorResponse('Test', 400));
});

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/offices', officesRoutes);

// Custom Error Handler
// Always define this middleware as last
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('Error:', err.message);
  winston.error(err);
});
