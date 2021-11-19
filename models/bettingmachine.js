import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BettingMachineSchema = new Schema(
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
    spaceName: String,
    caffeBar: String,
    owner: String,
    decisionMonth: Date,
    decisionClass: String,
    contract: Boolean,
    electricCertificate: Boolean,
    statement200m: Boolean,
    fireExtinguisher: Boolean,
    submittedToMinistryOfFinance: Boolean,
    taxExpires: Boolean,
    taxRecord: Boolean,
    taxDecision: Boolean,
    insuranceApplication: Boolean,
    openedAt: Date,
    closedAt: Date,
    advertisement: Boolean,
    tcomLine: Boolean,
    informatics: Boolean,
    maxTV: Boolean,
    feeWithVat: String,
    rent: Number,
    lockdown: String,
    contactPerson: String,
    obligationsFrom: Date,
    price: Number,
    currency: String,
    remark: String,
    manager: String,
    dateOfAgreement: Date,
    agreementPerson: String,
    fee: Boolean,
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    userFullName: String,
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const BettingMachine = mongoose.model('BettingMachine', BettingMachineSchema);

export default BettingMachine;
