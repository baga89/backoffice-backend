import { ErrorResponse } from '../utils/errorResponse.js';
import winston from 'winston';

// Whenever we call next(err) inside the app,
// we are passing that err object to this function
export const errorHandler = (err, req, res, next) => {
  // Log to console for dev
  console.log(err.message);

  // Write error to the logfile.log
  winston.error(err);

  let error = { ...err };

  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Izvor nije pronađen`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const value = Object.values(err.keyValue);
    const message = `Vrijednost ${value} već postoji u bazi. Unesite drugu vrijednost.`;
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Greška na serveru',
  });
};
// https://expressjs.com/en/guide/error-handling.html
