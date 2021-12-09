import { Router } from 'express';
import {
  getOffices,
  getOfficesCount,
  getOffice,
  createOffice,
  updateOffice,
  deleteOffice,
} from '../../controllers/offices.js';
import { protect } from '../../middleware/auth.js';

const router = Router();

// @desc     Get all officess
// @route    GET /api/offices
// @access   Public
router.get('/', getOffices);

// @desc     Get offices count
// @route    GET /api/offices/count
// @access   Public
router.get('/count', getOfficesCount);

// @desc     Get single office
// @route    GET /api/offices/:id
// @access   Public
router.get('/:id', getOffice);

// @route    POST /api/offices
// @desc     Post new Office
// @access   Private
router.post('/', protect, createOffice);

// @route    PUT /api/offices/:id
// @desc     Update existing office
// @access   Private
router.put('/:id', protect, updateOffice);

// @desc     Delete existing office
// @route    DELETE /api/offices/:id
// @access   Private
router.delete('/:id', protect, deleteOffice);

export default router;
