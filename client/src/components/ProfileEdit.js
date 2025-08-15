// ProfileEdit.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    isDoctor: false,
    isAdmin: false
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': token
          }
        };
        const res = await axios.get('/api/users/profile', config);
        setFormData({
          name: res.data.name,
          email: res.data.email,
          isDoctor: res.data.isDoctor,
          isAdmin: res.data.isAdmin
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': token
        }
      };
      await axios.put('/api/users/profile', formData, config);
      // Optionally, you can show a success message or redirect to another page
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        <label>Doctor:</label>
        <input type="checkbox" name="isDoctor" checked={formData.isDoctor} onChange={() => setFormData({ ...formData, isDoctor: !formData.isDoctor })} />
        <label>Admin:</label>
        <input type="checkbox" name="isAdmin" checked={formData.isAdmin} onChange={() => setFormData({ ...formData, isAdmin: !formData.isAdmin })} />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
