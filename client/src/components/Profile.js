// ProfileDisplay.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./Layout";
import { useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((state) => state.user);

  useEffect(() => {

  }, [user]);

  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";

  return (
    <Layout>
      <h1 className="page-title">{role} Profile</h1>
    </Layout>
  );
}

export default Profile;
