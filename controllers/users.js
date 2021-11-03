import User from '../models/user.js';
import { ErrorResponse } from '../utils/errorResponse.js';
import { asyncHandler } from '../middleware/async.js';

// Get users
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});

  if (!users) return next(new ErrorResponse('Trenutno nema nijednog korisnika', 400));

  res.status(200).json(users);
});

// Get user
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json(user);
});

// Create user
export const createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json(user);
});

// Update user
export const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('+password');
  const { firstName, lastName, email, password } = req.body;

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  if (password) user.password = password;

  await user.save();

  res.status(200).json(user);
});

// Delete user
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  res.status(200).json(user);
});
