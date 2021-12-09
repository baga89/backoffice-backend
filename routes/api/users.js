import { Router } from 'express';
import { getUsers, getUsersCount, getUser, createUser, updateUser, deleteUser } from '../../controllers/users.js';
import { protect, authorize } from '../../middleware/auth.js';

const router = Router();
router.use(protect);
router.use(authorize('admin'));

// @desc      Get all users
// @route     GET /api/users
// @access    Private/Admin
router.get('/', getUsers);

// @desc     Get users count
// @route    GET /api/users/count
// @access   Public
router.get('/count', getUsersCount);

// @desc      Get single user
// @route     GET /api/users/:id
// @access    Private/Admin
router.get('/:id', getUser);

// @desc      Create user
// @route     POST /api/users
// @access    Private/Admin
router.post('/', createUser);

// @desc      Update user
// @route     PUT /api/users/:id
// @access    Private/Admin
router.put('/:id', updateUser);

// @desc      Delete user
// @route     DELETE /api/users/:id
// @access    Private/Admin
router.delete('/:id', deleteUser);

export default router;
