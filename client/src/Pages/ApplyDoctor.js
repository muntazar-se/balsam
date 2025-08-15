import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import React from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";
import moment from "moment";

function ApplyDoctor() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user) || {};
  const navigate = useNavigate();
  
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());

      // Convert timings to string format before sending
      const timings = values.timings.map((time) => time.format("HH:mm"));
      const response = await axios.post(
        "/api/user/apply-doctor-account",
        {
          ...values,
          userId: user._id,
          firstName: user.user.firstName,
          lastName: user.user.lastName,
          timings,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success("Doctor account applied successfully!");
        navigate("/");
      } else {
        toast.error(response.data.message || "Failed to apply for doctor account");
      }
    } catch (error) {
      dispatch(hideLoading());
      if (error.response && error.response.data && error.response.data.message) {
        if (error.response.data.message === "You have already submitted an application for a doctor account, which is currently pending approval from the admin.") {
          toast(
            error.response.data.message,
            {
              icon: '⚠️',
              style: {
                borderRadius: '8px',
                background: '#fff3cd',
                color: '#856404',
              },
            }
          );
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("Something went wrong, please try again later.");
      }
    }
  };

  return (
    <Layout>
      <h1 className="page-title">Apply Doctor</h1>
      <hr />
      <DoctorForm onFinish={onFinish} />
    </Layout>
  );
}

export default ApplyDoctor;