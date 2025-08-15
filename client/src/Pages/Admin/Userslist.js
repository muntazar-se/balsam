import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { Table, Input, Button } from "antd";
import moment from "moment";


function Userslist() {
  const [doctors, setDoctors] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const getUsersData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("/api/admin/get-all-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (resposne.data.success) {
        setUsers(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/doctors/search?name=${searchName}`
      );
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
    getUsersData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      className: "column",
      render: (text, record) => (
        <span className="boldnames">
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      className: "column",
    },
    // {
    //   title: "Created At",
    //   dataIndex: "createdAt",
    //   render: (record, text) => moment(record.createdAt).format("DD-MM-YYYY"),
    // },
    {
      title: "Actions",
      dataIndex: "actions",
      className: "column",
      render: (text, record) => (
        <div className="d-flex">
          <h1 className="anchor anchor-action rejectblockbutton ">
            <span> Block</span></h1>
        </div>
        
      ),
      
    },
  ];

  return (
    <Layout>
      <div className="search-form-container">
        <Input
          className="search-input"
          placeholder="Search User By Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Button className="search-button" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <h1 className="page-header">Users List</h1> 
      <hr  className="hr-style" />
      
      <Table columns={columns} dataSource={users} />
      
    </Layout>
  );
}

export default Userslist;
