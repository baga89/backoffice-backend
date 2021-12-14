import Office from '../models/office.js';
import { ErrorResponse } from '../utils/errorResponse.js';
import { asyncHandler } from '../middleware/async.js';

// Gett offices
export const getOffices = asyncHandler(async (req, res, next) => {
  const offices = await Office.find({});

  if (!offices) return next(new ErrorResponse('Trenutno nema nijedne poslovnice', 400));

  res.status(200).json(offices);
});

// Gett offices count
export const getOfficesCount = asyncHandler(async (req, res, next) => {
  const officesCount = await Office.countDocuments();

  res.status(200).json(officesCount);
});

// Get office
export const getOffice = asyncHandler(async (req, res, next) => {
  const office = await Office.findById(req.params.id);

  if (!office) return next(new ErrorResponse('Poslovnica sa zadanim ID-em nije pronađena', 404));

  res.status(200).json(office);
});

// Create office
export const createOffice = async (req, res, next) => {
  const { number, locationTag } = req.body;

  let office = await Office.findOne({ $or: [{ number: number }, { locationTag: locationTag }] });

  if (office) {
    // Check office number
    if (office.number == number) return next(new ErrorResponse(`Poslovnica sa brojem ${number} već postoji!`, 400));

    // Check office location tag
    if (office.locationTag === locationTag)
      return next(new ErrorResponse(`Poslovnica sa lokacijskom oznakom ${locationTag} već postoji!`, 400));
  }

  // Add user to req.body
  req.body.user = req.user.id;
  req.body.userFullName = req.user.firstName + ' ' + req.user.lastName;

  office = new Office(req.body);

  await office.save();

  res.status(201).json(office);
};

// Update officee
export const updateOffice = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let office = await Office.findById(id);

  if (!office) return next(new ErrorResponse(`Poslovnica sa ID-em ${id} nije pronađena`, 404));

  // Add user to req.body
  req.body.user = req.user.id;
  req.body.userFullName = req.user.firstName + ' ' + req.user.lastName;

  office = await Office.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(office);
});

// Delete office
export const deleteOffice = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let office = await Office.findById(id);

  if (!office) return next(new ErrorResponse(`Poslovnica sa ID-em ${id} nije pronađena`, 404));

  office = await Office.findByIdAndDelete(id);

  res.status(200).json(office);
});
