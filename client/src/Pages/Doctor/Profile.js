import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DoctorForm from "../../components/DoctorForm";
import moment from "moment";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());

      // Format timings correctly
      const formattedValues = {
        ...values,
        userId: user._id,
        timings: values.timings.map((time) => time.format("HH:mm")),
      };

      console.log("Formatted values being sent to backend:", formattedValues);

      const response = await axios.post(
        "/api/doctor/update-doctor-profile",
        formattedValues,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());

      if (response.data.success) {
        console.log("Backend response:", response.data);
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-user-id",
        {
          userId: params.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        const data = response.data.data;
        // Ensure timings are formatted as moment objects
        if (data.timings) {
          data.timings = data.timings.map((time) => time.format("HH:mm"));
        }
        console.log("Doctor data fetched:", data);
        setDoctor(data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
      dispatch(hideLoading());
      toast.error("Failed to fetch doctor data");
    }
  };

  useEffect(() => {
    if (params.userId) {
      getDoctorData();
    }
  }, [params.userId]);

  return (
    <Layout>
      <h1 className="page-title">Doctor Profile</h1>
      <hr />
      {doctor ? (
        <DoctorForm onFinish={onFinish} initialValues={doctor} />
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
}

export default Profile;
