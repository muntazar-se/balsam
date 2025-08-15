import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table, Input, Button } from "antd";
import moment from "moment";

function DoctorsList() {
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getDoctorsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeDoctorStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/change-doctor-account-status",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getDoctorsData();
      }
    } catch (error) {
      toast.error("Error changing doctor account status");
      dispatch(hideLoading());
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/doctors/search?name=${searchName}`);
      setLoading(false);
      if (response.data) {
        setDoctors(response.data);
        setShowResults(true);
      } else {
        setDoctors([]);
        setShowResults(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error searching doctors:", error);
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      className: "column",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      className: "column",
    },
    {
      title: "Status",
      dataIndex: "status",
      className: "column",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      className: "column",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <>
              <h1
                className="anchor anchor-action px-2 approve-button "
                onClick={() => changeDoctorStatus(record, "approved")}
              >
                Approve
              </h1>
              <h1
                className="anchor anchor-action px-2 rejectblockbutton"
                onClick={() => changeDoctorStatus(record, "rejected")}
              >
                
                Reject
                
                
              </h1>
            </>
          )}
          {record.status === "approved" && (
            <h1
              className="anchor anchor-action px-2 rejectblockbutton"
              onClick={() => changeDoctorStatus(record, "blocked")}
            >
              Block 
            </h1>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="search-form-container">
        <Input
          className="search-input"
          placeholder="Search Doctor By Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Button className="search-button" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <h1 className="page-title">Doctors List</h1>
      <hr />
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
}

export default DoctorsList;
