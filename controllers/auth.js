import User from '../models/user.js';
import { ErrorResponse } from '../utils/errorResponse.js';
import { asyncHandler } from '../middleware/async.js';
import { sendEmail } from '../utils/sendEmail.js';
import crypto from 'crypto';

// Register user
// export const register = asyncHandler(async (req, res, next) => {
//   const { firstName, lastName, email, password, role } = req.body;

//   let user = await User.findOne({ email: email });
//   if (user) return next(new ErrorResponse('Korisnik je već registriran!', 400));

//   user = new User({
//     firstName,
//     lastName,
//     email,
//     password,
//     role,
//   });

//   await user.save();

//   sendTokenResponse(user, 200, res);
// });

// Login user
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email: email }).select('+password');
  if (!user) return next(new ErrorResponse('Neispravan email ili lozinka!', 401));

  const isValidPassword = await user.validPassword(password);
  if (!isValidPassword) return next(new ErrorResponse('Neispravan email ili lozinka!', 401));

  sendTokenResponse(user, 200, res);
});

// Logout user
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({});
});

// Get current logged user
export const getMe = asyncHandler(async (req, res, next) => {
  // user is already available in req due to the protect middleware
  const user = req.user;

  res.status(200).json(user);
});

// Update password
export const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.validPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Lozinka je neispravna', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// Update user
export const updateUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { firstName, lastName, email },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(user);
});

// Forgot password
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('Ne postoji korisnik s tim emailom', 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`;

  const message = `Ovaj email ste primili jer ste vi (ili netko drugi) zatražili poništavanje lozinke. Molimo vas pošaljite PUT zahtjev na:: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Token za poništavanje lozinke',
      message,
    });

    res.status(200).json('Email poslan');
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email ne može biti poslan', 500));
  }
});

// Reset password
export const resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse('Neispravan token', 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json(token);
};
