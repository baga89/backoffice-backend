import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OfficeSchema = new Schema(
  {
    number: {
      type: Number,
      unique: true,
      required: true,
    },
    locationTag: {
      type: String,
      unique: true,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    userFullName: String,
    owner: String,
    contract: Boolean,
    electricCertificate: Boolean,
    fireExtinguisher: Boolean,
    submittedToMinistryOfFinance: Boolean,
    taxExpires: Boolean,
    taxExpired: Boolean,
    taxDecision: Boolean,
    equippedOffice: Boolean,
    barMTU: Boolean,
    smokingMTU: Boolean,
    terraceMTU: Boolean,
    insuranceApplication: Boolean,
    stickers: Boolean,
    tcomLine: Boolean,
    informatics: Boolean,
    nickySecurity: Boolean,
    maxTV: Boolean,
    openedAt: Date,
    closedAt: Date,
    applicationCommercialCourt: Boolean,
    applicationStatistics: Boolean,
    documentationNoky: Boolean,
    requestForExemption: Boolean,
    applicationMUP: Boolean,
    applicationEuroherc: Boolean,
    applicationHRT: Boolean,
    stamp: Boolean,
    obligationsFrom: Date,
    price: Number,
    currency: String,
    remark: String,
    manager: String,
    dateOfAgreement: Date,
    agreementPerson: String,
    fee: Boolean,
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const Office = mongoose.model('Office', OfficeSchema);

export default Office;
