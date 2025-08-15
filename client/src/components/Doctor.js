import React from "react";
import { useNavigate } from "react-router-dom";
import { Rate, message, Card, Avatar, Tag, Space, Typography, Divider } from "antd";
import { UserOutlined, EnvironmentOutlined, DollarOutlined, ClockCircleOutlined, StarOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";

const { Text, Title } = Typography;

function Doctor({ doctor, rating }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user) || {};
  const isAuthenticated = !!user?.user;
  const averageRating = rating?.averageRating?.toFixed(1) || '0';
  const totalRatings = rating?.totalRatings || '0';

  const handleDoctorClick = () => {
    if (isAuthenticated) {
      navigate(`/book-appointment/${doctor._id}`);
    } else {
      message.info("Please login or register to book an appointment");
      navigate("/login");
    }
  };

  const formatTimings = (timings) => {
    if (typeof timings === 'string') {
      return timings;
    }
    if (timings && timings.length > 0) {
      return timings.map((timing, index) => (
        <div key={index} style={{ marginBottom: '4px' }}>
          <Text strong>{timing.day}:</Text> {timing.start}-{timing.end}
        </div>
      ));
    }
    return 'Not specified';
  };

  return (
    <Card
      hoverable
      className="doctor-card"
      onClick={handleDoctorClick}
      style={{ 
        height: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}
      bodyStyle={{ padding: '1.5rem' }}
    >
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <Avatar 
          size={80} 
          icon={<UserOutlined />} 
          style={{ 
            backgroundColor: '#007fbe',
            marginBottom: '1rem',
            fontSize: '32px'
          }} 
        />
        <Title level={4} style={{ margin: '0.5rem 0', color: '#1e293b' }}>
          Dr. {doctor.firstName} {doctor.lastName}
        </Title>
        <Tag 
          color="blue" 
          style={{ 
            borderRadius: '20px',
            padding: '4px 12px',
            fontSize: '12px',
            fontWeight: '600'
          }}
        >
          {doctor.specialization}
        </Tag>
      </div>

      <Divider style={{ margin: '1rem 0' }} />

      {/* Rating Section */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <Space direction="vertical" size="small">
          <div>
            <Rate
              allowHalf
              disabled
              value={parseFloat(averageRating)}
              style={{ fontSize: '16px' }}
            />
          </div>
          <div>
            <Text strong style={{ fontSize: '18px', color: '#007fbe' }}>
              {averageRating}
            </Text>
            <Text type="secondary" style={{ marginLeft: '8px' }}>
              ({totalRatings} reviews)
            </Text>
          </div>
        </Space>
      </div>

      <Divider style={{ margin: '1rem 0' }} />

      {/* Details Section */}
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <EnvironmentOutlined style={{ color: '#64748b' }} />
          <Text strong>Location:</Text>
          <Text>{doctor.city}</Text>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <DollarOutlined style={{ color: '#64748b' }} />
          <Text strong>Consultation Fee:</Text>
          <Text style={{ color: '#10b981', fontWeight: '600' }}>
            {doctor.feePerConsultation} IQD
          </Text>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <ClockCircleOutlined style={{ color: '#64748b', marginTop: '4px' }} />
          <div style={{ flex: 1 }}>
            <Text strong>Available Times:</Text>
            <div style={{ marginTop: '4px' }}>
              {formatTimings(doctor.timings)}
            </div>
          </div>
        </div>
      </Space>

      {/* Action Button */}
      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <Tag 
          color="green" 
          style={{ 
            cursor: 'pointer',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            border: 'none'
          }}
          onClick={handleDoctorClick}
        >
          Book Appointment
        </Tag>
      </div>
    </Card>
  );
}

export default Doctor;
