import React, { useState, useEffect } from "react";
import { Rate, Input, Button, message } from "antd";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom'; // To get query params
import Layout from "../components/Layout";
import axios from "axios"; // Import axios for API calls

const RatingPage = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [doctorId, setDoctorId] = useState(null); // State for doctorId
  const { user } = useSelector((state) => state.user) || {};
  const location = useLocation(); // Get location to read query params

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const doctorId = params.get('doctorId');
    if (doctorId) {
      setDoctorId(doctorId);
    }
  }, [location]);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage (or wherever it's stored)
      const response = await axios.post(
        "/api/user/add-feedback",
        {
          doctorId,
          rating,
          comment: feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      if (response.data.success) {
        message.success(response.data.message);
        // Optionally reset the form
        setRating(0);
        setFeedback("");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("An error occurred while submitting feedback");
    }
  };

  return (
    <Layout>
      <div className="rating-container">
        <h1 className="page-header">Rate Your Consultation</h1>
        <div className="rating-section">
          <Rate allowHalf value={rating} onChange={handleRatingChange} />
        </div>
        <div className="feedback-section">
          <h2>Feedback</h2>
          <Input.TextArea
            rows={4}
            placeholder="Tell us about your experience..."
            value={feedback}
            onChange={handleFeedbackChange}
          />
        </div>
        <div className="submit-section">
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default RatingPage;
