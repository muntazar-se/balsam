const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema(
  {
  
    doctorId: {
      type: String,
      required: false,
    },
    doctorInfo: {
      type: Object,
      required: false,
    },
    userInfo: {
      type: Object,
      required: false,
    },
    date: {
      type: String,
      required: false,
    },
    time: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const appointmentModel = mongoose.model("appointmenst", appointmentSchema);
module.exports = appointmentModel;
