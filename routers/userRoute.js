const express = require("express");
const { OpenAI } = require('openai');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const Feedback = require('../models/feedbackModel');
const authMiddleware = require("../middlewares/authMiddelware");
const moment = require("moment-timezone");
const openai = new OpenAI({
  organization: "org-oZtT72t7V1aRRXTrd7tCH7BT", 
  project: "proj_QMUxlVizOKkM8U1XBvWhOaK3", 
});




router.post("/register", async (req, res) => {
  const { firstName,lastName, email, password, passwordConfirm } = req.body;

  try {
    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .json({ message: "Email is already registered", success: false });
    }

    // Check if password and passwordConfirm match
    if (password !== passwordConfirm) {
      return res
        .status(200)
        .json({ message: "Passwords do not match", success: false });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with hashed password
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Return success response
    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.log(error);
    // Handle errors
    console.error("Error registering user:", error);
    res.status(501).json({
      message: "An error occurred while registering the user",
      success: false,
      error,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404) 
        .json({ message: "User not found", success: false });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid password", success: false });
    }

    else {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "2d", 
      });

      // Return success response with token
      res.status(200).json({ message: "Welcome back!", success: true, token });
    }
  } catch (error) {
    // Log and handle errors
    console.error("Error logging in:", error);
    return res
      .status(501) // Internal Server Error
      .json({ message: "An error occurred while logging in", success: false });
  }
});
router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });

    if (!user)
      return res
        .status(200)
        .send({ message: "User does not exist!", success: false });

    // Include isAdmin and isDoctor properties in the response payload
    res.status(200).send({
      success: true,
      data: {
        user,
        // paste the code here
      },
    });
  } catch (error) {
    return res
      .status(200)
      .send({ message: "Error getting user info", success: false, error });
  }
});

// Router definition
router.post("/apply-doctor-account", authMiddleware, async (req, res) => {
  try {
    // Check if the user has already applied
    const existingDoctor = await Doctor.findOne({ userId: req.userId, status: 'pending' });

    if (existingDoctor) {
      return res.status(400).send({
        success: false,
        message: "You have already submitted an application for a doctor account, which is currently pending approval from the admin.",
      });
    }

    // Create a new doctor application
    const newdoctor = new Doctor({
      ...req.body,
      userId: req.userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      status: "pending",
    });
    await newdoctor.save();

    // Get the admin user
    const adminUser = await User.findOne({ isAdmin: true });

    // Format the createdAt timestamp
    const formattedTimestamp = moment(newdoctor.createdAt).format("YYYY-MM-DD HH:mm");

    // Create the notification message including the formatted timestamp
    const message = `${newdoctor.firstName} ${newdoctor.lastName} has applied for a doctor account at ${formattedTimestamp}`;

    // Push the notification to the admin user's unseenNotifications array
    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-doctor-request",
      message,
      data: {
        doctorId: newdoctor._id,
        name: newdoctor.firstName + " " + newdoctor.lastName,
      },
      onClickPath: "/admin/doctorslist",
    });

    // Update the admin user document with the new notification
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });

    res.status(200).send({
      success: true,
      message: "Doctor account applied successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
});


router.post(
  "/mark-all-notifications-as-seen",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      const unseenNotifications = user.unseenNotifications;
      const seenNotifications = user.seenNotifications;
      seenNotifications.push(...unseenNotifications);
      user.unseenNotifications = [];
      user.seenNotifications = seenNotifications;
      const updatedUser = await user.save();
      updatedUser.password = undefined;
      res.status(200).send({
        success: true,
        message: "All notifications marked as seen",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying doctor account",
        success: false,
        error,
      });
    }
  }
);

router.post("/delete-all-notifications", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.seenNotifications = [];
    user.unseenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notifications cleared",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
});

router.get("/get-all-approved-doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "approved" });
    res.status(200).send({
      message: "Doctors fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
});
router.post("/book-appointment", authMiddleware, async (req, res) => {
  try {
    req.body.status = "pending";
    const userId = req.body.userInfo.user._id;

    // Convert date and time to moment objects
    const appointmentDate = moment(req.body.date, "YYYY-MM-DD");
    const appointmentTime = moment(req.body.time, "HH:mm");

    // Combine date and time to get full appointment moment
    const appointmentMoment = moment(`${appointmentDate.format("YYYY-MM-DD")} ${appointmentTime.format("HH:mm")}`);

    // Check if the appointment moment is in the past
    if (appointmentMoment.isBefore(moment())) {
      return res.status(400).send({
        message: "Cannot book an appointment in the past",
        success: false,
      });
    }

    req.body.date = appointmentDate.toISOString();
    req.body.time = appointmentTime.toISOString();

    const newAppointment = new Appointment(req.body);
    await newAppointment.save();

    const userInfo = req.body.userInfo;
    const userName = userInfo?.user?.firstName + " " + userInfo?.user?.lastName;

    const user = await User.findOne({ _id: req.body.doctorInfo.userId });
    user.unseenNotifications.push({
      type: "new-appointment-request",
      message: `A new appointment request has been made by ${userName}`,
      onClickPath: "/doctor/appointments",
    });
    await user.save();
    res.status(200).send({
      message: "Appointment booked successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
});


router.post("/check-booking-avilability", authMiddleware, async (req, res) => {
  try {
    const date = moment(req.body.date).startOf("day");
    const fromTime = moment(req.body.time, "HH:mm");

    if (!fromTime.isValid()) {
      return res.status(400).send({
        message: "Invalid time format",
        success: false,
      });
    }

    const appointmentMoment = moment(`${date.format("YYYY-MM-DD")} ${fromTime.format("HH:mm")}`);

    // Check if the appointment moment is in the past
    if (appointmentMoment.isBefore(moment())) {
      return res.status(400).send({
        message: "Cannot check availability for past times",
        success: false,
      });
    }

    const toTime = fromTime.clone().add(1, "hour");
    const doctor = await Doctor.findById(req.body.doctorId);

    if (!doctor) {
      return res.status(404).send({
        message: "Doctor not found",
        success: false,
      });
    }

    const workStartTime = moment(doctor.timings[0], "HH:mm");
    const workEndTime = moment(doctor.timings[1], "HH:mm");

    if (!workStartTime.isValid() || !workEndTime.isValid()) {
      return res.status(400).send({
        message: "Doctor's working times are not properly defined",
        success: false,
      });
    }

    if (fromTime.isBefore(workStartTime) || toTime.isAfter(workEndTime)) {
      return res.status(200).send({
        message: "Selected time is outside doctor's working hours",
        success: false,
      });
    }

    const isoToTime = toTime.toISOString();
    const appointments = await Appointment.find({
      doctorId: req.body.doctorId,
      date: date.toISOString(),
      $and: [
        { time: { $gte: fromTime.toISOString() } },
        { time: { $lt: isoToTime } },
      ],
    });

    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not available",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Appointments available",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error checking availability",
      success: false,
      error,
    });
  }
});



router.get("/get-appointments-by-user-id", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ "userInfo.user._id": req.userId });

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
});
// Add this code to userRoute.js
router.get("/search-doctors", authMiddleware, async (req, res) => {
  const { query } = req.query;

  try {
    const doctors = await Doctor.find({
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { specialization: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { country: { $regex: query, $options: "i" } },
        { address: { $regex: query, $options: "i" } }, // Add address search
      ],
    }).where({ status: "approved" });

    res.status(200).json({
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.error("Error searching doctors:", error);
    res.status(500).json({
      success: false,
      message: "Error searching doctors",
      error,
    });
  }
});

// Add feedback
router.post('/add-feedback', authMiddleware, async (req, res) => {
  try {
    const { doctorId, rating, comment } = req.body;
    console.log('Request body:', req.body);
    console.log('User from authMiddleware:', req.user);

    const newFeedback = new Feedback({
      doctorId,
      userId: req.user, // Ensure userId is correctly set
      rating,
      comment,
    });

    await newFeedback.save();
    res.status(200).send({
      success: true,
      message: 'Feedback added successfully',
    });
  } catch (error) {
    console.error('Error adding feedback:', error.message); // Log the error message
    res.status(500).send({
      success: false,
      message: 'Error adding feedback',
      error: error.message, // Include the error message in the response
    });
  }
});

// Get doctor ratings
router.get('/doctor-ratings', authMiddleware, async (req, res) => {
  try {
    const ratings = await Feedback.aggregate([
      {
        $group: {
          _id: "$doctorId",
          averageRating: { $avg: "$rating" },
          totalRatings: { $sum: 1 }
        }
      }
    ]);

    res.status(200).send({
      success: true,
      data: ratings,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error fetching doctor ratings',
      error,
    });
  }
});







// Get feedback for a doctor
router.get('/get-feedback/:doctorId', authMiddleware, async (req, res) => {
  try {
    const feedback = await Feedback.find({ doctorId: req.params.doctorId });
    res.status(200).send({
      success: true,
      data: feedback,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error fetching feedback',
      error,
    });
  }
});


router.post("/change-appointment-status", authMiddleware, async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
      status,
    }, { new: true }); // Fetch the updated appointment

    // Send notification to user
    const user = await User.findById(appointment.doctorInfo.userId);
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

router.post("/search-doctors-ai", authMiddleware, async (req, res) => {
  const { query } = req.body;

  try {
    // Use OpenAI to analyze the health situation and determine specialty
    const aiAnalysis = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: `You are a medical specialty recommendation assistant. 
          Given a patient's description of symptoms or health concern, 
          provide:
          1. A single most appropriate medical specialty
          2. A brief explanation of why this specialty is recommended
          3. Ensure the specialty is one that exists in medical practice

          Possible specialties include: 
          - Cardiology
          - Neurology
          - Orthopedics
          - Dermatology
          - Gastroenterology
          - Endocrinology
          - Pulmonology
          - Oncology
          - Psychiatry
          - Pediatrics
          - General Practice
          - Surgery
          - Gynecology
          - Urology
          - Ophthalmology
          - ENT (Ear, Nose, Throat)
          - Nephrology
          - Rheumatology`
        },
        { 
          role: "user", 
          content: query 
        }
      ]
    });

    // Extract specialty recommendation from AI response
    const aiResponse = aiAnalysis.choices[0].message.content;
    
    // Parse the specialty from the AI response
    const specialtyMatch = aiResponse.match(/Specialty:\s*(\w+)/i);
    const specialty = specialtyMatch ? specialtyMatch[1] : null;

    // Search for doctors with the recommended specialty
    const doctors = specialty 
      ? await Doctor.find({ 
          specialization: { $regex: specialty, $options: "i" }, 
          status: "approved" 
        }) 
      : [];

    res.status(200).json({
      success: true,
      data: doctors,
      aiAnalysis: aiResponse,
      recommendedSpecialty: specialty,
      message: "Medical specialty search completed"
    });
  } catch (error) {
    console.error("Detailed error in medical search:", error);
    res.status(500).json({
      success: false,
      message: "Error processing medical search",
      error: error.message || "Unknown error occurred"
    });
  }
});

module.exports = router;
