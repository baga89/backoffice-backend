import { Router } from 'express';
import {
  getBettingMachines,
  getBettingMachinesCount,
  getBettingMachine,
  createBettingMachine,
  updateBettingMachine,
  deleteBettingMachine,
} from '../../controllers/bettingmachines.js';
import { protect } from '../../middleware/auth.js';

const router = Router();

// @desc     Get all betting machines
// @route    GET /api/betting-machines
// @access   Public
router.get('/', getBettingMachines);

// @desc     Get betting machines count
// @route    GET /api/betting-machines/count
// @access   Public
router.get('/count', getBettingMachinesCount);

// @desc     Get single betting machine
// @route    GET /api/betting-machines/:id
// @access   Public
router.get('/:id', getBettingMachine);

// @desc     Post new betting machine
// @route    POST /api/betting-machines
// @access   Private
router.post('/', protect, createBettingMachine);

// @desc     Update existing betting machine
// @route    PUT /api/betting-machines/:id
// @access   Private
router.put('/:id', protect, updateBettingMachine);

// @desc     Delete existing betting machine
// @route    DELETE /api/bettin-machines/:id
// @access   Private
router.delete('/:id', protect, deleteBettingMachine);

export default router;
