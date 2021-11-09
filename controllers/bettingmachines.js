import BettingMachine from '../models/bettingmachine.js';
import { ErrorResponse } from '../utils/errorResponse.js';
import { asyncHandler } from '../middleware/async.js';

// Get betting machines
export const getBettingMachines = asyncHandler(async (req, res, next) => {
  const bettingMachines = await BettingMachine.find({});

  if (!bettingMachines) return next(new ErrorResponse('Trenutno nema nijednog kladomata', 400));

  res.status(200).json(bettingMachines);
});

// Get betting machine
export const getBettingMachine = asyncHandler(async (req, res, next) => {
  const bettingMachine = await BettingMachine.findById(req.params.id);

  if (!bettingMachine) return next(new ErrorResponse('Kladoamt sa zadanim ID-em nije pronađen', 404));

  res.status(200).json(bettingMachine);
});

// Create betting machine
export const createBettingMachine = async (req, res, next) => {
  const { number, locationTag } = req.body;

  let bettingMachine = await BettingMachine.findOne({ $or: [{ number: number }, { locationTag: locationTag }] });

  if (bettingMachine) {
    // Check betting machine number
    if (bettingMachine.number == number)
      return next(new ErrorResponse(`Kladomat sa brojem ${number} već postoji!`, 400));

    // Check betting machine location tag
    if (bettingMachine.locationTag === locationTag)
      return next(new ErrorResponse(`Kladomat sa lokacijskom oznakom ${locationTag} već postoji!`, 400));
  }

  // Add user to req,body
  req.body.user = req.user.id;

  bettingMachine = new BettingMachine(req.body);

  await bettingMachine.save();

  res.status(201).json(bettingMachine);
};

// Update betting machine
export const updateBettingMachine = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let bettingMachine = await BettingMachine.findById(id);

  if (!bettingMachine) return next(new ErrorResponse(`Poslovnica sa ID-em ${id} nije pronađena`, 404));

  // Add user to req.body
  req.body.user = req.user.id;

  bettingMachine = await BettingMachine.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(bettingMachine);
});

// Delete betting machine
export const deleteBettingMachine = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let bettingMachine = await BettingMachine.findById(id);

  if (!bettingMachine) return next(new ErrorResponse(`Kladomat sa ID-em ${id} nije pronađen`, 404));

  bettingMachine = await BettingMachine.findByIdAndDelete(id);

  res.status(200).json(bettingMachine);
});
