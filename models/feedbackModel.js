// models/feedbackModel.js
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    doctorId: {
      type: String,
      required: false,
    },
    userId: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
    comment: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
