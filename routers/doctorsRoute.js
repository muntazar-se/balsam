const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");
const authMiddleware = require("../middlewares/authMiddelware");
const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");

router.post("/get-doctor-info-by-user-id", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Doctor info fetched successfully",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctor info", success: false, error });
  }
});

router.post("/get-doctor-info-by-id", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Doctor info fetched successfully",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctor info", success: false, error });
  }
});
router.post("/update-doctor-profile", authMiddleware, async (req, res) => {
  try {
    console.log("Received update request:", req.body);
    console.log("Received update requestiddddddd:", { userId: req.userId });
    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.userId },
      req.body,
      { new: true, runValidators: true }  // Ensure to return the updated document and run validators
    );

    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }

    console.log("Updated doctor:", doctor);

    res.status(200).send({
      success: true,
      message: "Doctor profile updated successfully",
      data: doctor,
    });
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    res.status(500).send({
      message: "Error updating doctor info",
      success: false,
      error,
    });
  }
});




router.get(
  "/get-appointments-by-doctor-id",
  authMiddleware,
  async (req, res) => {
    try {
      const doctor = await Doctor.findOne({ userId: req.userId });
      const appointments = await Appointment.find({ doctorId: doctor._id });
      res.status(200).send({
        message: "Appointments fetched successfully",
        success: true,
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error fetching appointments",
        success: false,
        error,
      });
    }
  }
);


router.post("/change-appointment-status", authMiddleware, async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
      status,
    }, { new: true }); // Fetch the updated appointment

    // Send notification to user
    const user = await User.findById(appointment.userInfo.user._id);
    const unseenNotifications = user.unseenNotifications;

    if (status === "canceled") {
      // Appointment canceled notification
      unseenNotifications.push({
        type: "appointment-canceled",
        message: "Your appointment has been canceled.",
        onClickPath: "/appointments",
      });
    } else if (status === "finished") {
      // Appointment finished notification
      unseenNotifications.push({
        type: "appointment-finished",
        message: "Your appointment has been completed. Please rate your consultation.",
        onClickPath: `/rate-consultation?doctorId=${appointment.doctorId}`, // Include doctorId in the URL
      });
    } else {
      // Generic status change notification
      unseenNotifications.push({
        type: "appointment-status-changed",
        message: `Your appointment status has been ${status}`,
        onClickPath: "/appointments",
      });
    }

    await user.save();

    res.status(200).send({
      message: "Appointment status updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error changing appointment status:", error);
    res.status(500).send({
      message: "Error changing appointment status",
      success: false,
      error,
    });
  }
});



module.exports = router;
