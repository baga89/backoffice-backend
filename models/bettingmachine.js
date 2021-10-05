import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BettingMachineSchema = new Schema(
  {
    number: {
      type: Number,
      unique: true,
      required: true,
    },
    decisionMonth: Date,
    decisionClass: String,
    locationTag: {
      type: String,
      unique: true,
      required: true,
    },
    spaceName: String,
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    caffeBar: String,
    owner: String,
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
    advertisement: Boolean,
    tcomLine: Boolean,
    informatics: Boolean,
    maxTV: Boolean,
    feeWithVat: Number,
    rent: Number,
    lockdown: String,
    contactPerson: String,
    contactPersonPhone: String,
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

const BettingMachine = mongoose.model('BettingMachine', BettingMachineSchema);

export default BettingMachine;
