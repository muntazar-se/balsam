const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    passwordConfirm: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    department: {
      type: String,
      required: false,
    },
    specialization: {
      type: String,
      required: false,
    },
    experience: {
      type: String,
      required: false,
    },
    timings: {
      type: Array,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    feePerConsultation: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
const doctorModel = mongoose.model("doctors", doctorSchema);

module.exports = doctorModel;
