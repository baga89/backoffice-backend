import { Router } from 'express';
import {
  // register,
  login,
  logout,
  getMe,
  updateUser,
  updatePassword,
  forgotPassword,
  resetPassword,
} from '../../controllers/auth.js';
import { protect } from '../../middleware/auth.js';

const router = Router();

// @desc      Register user
// @route     POST /api/auth/register
// @access    Public
// router.post('/register', register);

// @desc      Login user
// @route     POST /api/auth/login
// @access    Public
router.post('/login', login);

// @desc      Log user out / clear cookie
// @route     GET /api/auth/logout
// @access    Public
router.get('/logout', logout);

// @desc      Get current logged in user
// @route     GET /api/auth/me
// @access    Private
router.get('/me', protect, getMe);

// @desc      Update password
// @route     PUT /api/auth/updatepassword
// @access    Private
router.put('/updatepassword', protect, updatePassword);

// @desc      Update user
// @route     PUT /api/auth/updateuser
// @access    Private
router.put('/updateuser', protect, updateUser);

// @desc      Forgot password
// @route     POST /api/auth/forgotpassword
// @access    Public
router.post('/forgotpassword', forgotPassword);

// @desc      Reset password
// @route     PUT /api/auth/resetpassword/:resettoken
// @access    Public
router.put('/resetpassword/:resettoken', resetPassword);

export default router;
