import { Button, Col, DatePicker, Row, TimePicker, Rate } from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

function BookAppointment({ rating }) {
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();
  const [ratings, setRatings] = useState({});
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const { user } = useSelector((state) => state.user) || {};
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const getRatings = async () => {
    try {
      const response = await axios.get("/api/user/doctor-ratings", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const ratingsData = response.data.data.reduce((acc, rating) => {
        acc[rating._id] = {
          averageRating: rating.averageRating,
          totalRatings: rating.totalRatings,
        };
        return acc;
      }, {});

      setRatings(ratingsData);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  const averageRating = rating?.averageRating
    ? rating.averageRating.toFixed(1)
    : "No ratings yet";
  const totalRatings = rating?.totalRatings || "0";

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  const checkAvailability = async () => {
    try {
      const appointmentMoment = moment(`${moment(date).format("YYYY-MM-DD")} ${moment(time).format("HH:mm")}`);
      if (appointmentMoment.isBefore(moment())) {
        toast.error("Cannot check availability for past times");
        return;
      }

      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/check-booking-avilability",
        {
          doctorId: params.doctorId,
          date: moment(date).format("YYYY-MM-DD"),
          time: moment(time).format("HH:mm"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error checking availability");
      dispatch(hideLoading());
    }
  };

  const bookNow = async () => {
    setIsAvailable(false);

    const appointmentMoment = moment(`${moment(date).format("YYYY-MM-DD")} ${moment(time).format("HH:mm")}`);
    if (appointmentMoment.isBefore(moment())) {
      toast.error("Cannot book an appointment in the past");
      return;
    }

    try {
      dispatch(showLoading());
      const userId = user?._id;
      const response = await axios.post(
        "/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: userId,
          doctorInfo: doctor,
          userInfo: user,
          date: moment(date).format("YYYY-MM-DD"),
          time: moment(time).format("HH:mm"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/appointments");
      }
    } catch (error) {
      toast.error("Error booking appointment from frontend");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
    getRatings();
  }, []);

  return (
    <Layout>
      {doctor && (
        <div>
          <h1 className="page-title">
            {doctor.firstName} {doctor.lastName}
          </h1>
          {/* <p className="ratings">
            {rating !== undefined && (
              <Rate
                allowHalf
                disabled
                value={averageRating}
                style={{ fontSize: "14px", marginLeft: "10px" }}
              />
            )}
            <strong style={{ color: "black" }}> {averageRating}</strong>
            {` / (${totalRatings} rates)`}
          </p> */}
          <hr />
          <Row gutter={20} className="mt-5" align="middle">
            <Col span={8} sm={24} xs={24} lg={8}>
              <img
                src="https://thumbs.dreamstime.com/b/finger-press-book-now-button-booking-reservation-icon-online-149789867.jpg"
                alt=""
                width="100%"
                height="400"
              />
            </Col>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Timings :</b> {doctor.timings[0]} - {doctor.timings[1]}
              </h1>
              <p>
                <b>Phone Number : </b>
                {doctor.phoneNumber}
              </p>
              <p>
                <b>Country : </b>
                {doctor.country}
              </p>
              <p>
                <b>City : </b>
                {doctor.city}
              </p>
              <p>
                <b>Address : </b>
                {doctor.address}
              </p>
              <p>
                <b>Fee per Visit : </b>
                {doctor.feePerConsultation + ` $`}
              </p>

              <div className="d-flex flex-column pt-2 mt-2">
                <DatePicker
                  name="date"
                  format="YYYY-MM-DD"
                  onChange={(value) => {
                    if (value) {
                      setDate(value.toDate());
                    } else {
                      setDate(null);
                    }
                    setIsAvailable(false);
                  }}
                />

                <TimePicker
                  label="time"
                  name="time"
                  format="HH:mm"
                  className="mt-3"
                  onChange={(value) => {
                    if (value) {
                      setIsAvailable(false);
                      setTime(value.toDate());
                    } else {
                      setTime(null);
                    }
                  }}
                />

                {!isAvailable && (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={checkAvailability}
                  >
                    Check Availability
                  </Button>
                )}

                {isAvailable && (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={bookNow}
                  >
                    Book Now
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
}

export default BookAppointment;
