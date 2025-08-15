// Register.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Card, Typography, Space, Divider, Row, Col } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, UserAddOutlined } from '@ant-design/icons';
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { apiService } from "../config/apiConfig";

const { Title, Text, Paragraph } = Typography;

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (values.password !== values.passwordConfirm) {
      toast.error("Passwords do not match!");
      return;
    }
    
    try {
      dispatch(showLoading());
      
      let response;
      if (apiService) {
        response = await apiService.register(values);
      } else {
        const axios = require('axios');
        response = await axios.post("/api/user/register", values);
      }
      
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to login page");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      const errorMessage = error.response?.data?.message || error.message || "Registration failed";
      toast.error("Something went wrong: " + errorMessage);
    }
  };

  return (
    <div className="authentication">
      <Card className="authentication-form">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #007fbe 0%, #005a8b 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            boxShadow: '0 8px 32px rgba(0, 123, 190, 0.3)'
          }}>
            <UserAddOutlined style={{ fontSize: '32px', color: 'white' }} />
          </div>
          <Title level={2} style={{ color: '#1e293b', marginBottom: '0.5rem' }}>
            Join Balsam Healthcare
          </Title>
          <Paragraph style={{ color: '#64748b', fontSize: '16px', margin: 0 }}>
            Create your account to start booking appointments
          </Paragraph>
        </div>

        <Form
          layout="vertical"
          onFinish={onFinish}
          size="large"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
                label="First Name" 
                name="firstName"
                rules={[
                  { required: true, message: 'Please enter your first name!' },
                  { min: 2, message: 'First name must be at least 2 characters!' }
                ]}
              >
                <Input 
                  prefix={<UserOutlined style={{ color: '#cbd5e1' }} />}
                  placeholder="First name"
                  style={{ height: '48px', borderRadius: '8px' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                label="Last Name" 
                name="lastName"
                rules={[
                  { required: true, message: 'Please enter your last name!' },
                  { min: 2, message: 'Last name must be at least 2 characters!' }
                ]}
              >
                <Input 
                  prefix={<UserOutlined style={{ color: '#cbd5e1' }} />}
                  placeholder="Last name"
                  style={{ height: '48px', borderRadius: '8px' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item 
            label="Email Address" 
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined style={{ color: '#cbd5e1' }} />}
              placeholder="Enter your email address"
              style={{ height: '48px', borderRadius: '8px' }}
            />
          </Form.Item>

          <Form.Item 
            label="Password" 
            name="password"
            rules={[
              { required: true, message: 'Please enter your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined style={{ color: '#cbd5e1' }} />}
              placeholder="Create a strong password"
              style={{ height: '48px', borderRadius: '8px' }}
            />
          </Form.Item>

          <Form.Item 
            label="Confirm Password" 
            name="passwordConfirm"
            rules={[
              { required: true, message: 'Please confirm your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined style={{ color: '#cbd5e1' }} />}
              placeholder="Confirm your password"
              style={{ height: '48px', borderRadius: '8px' }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: '1.5rem' }}>
            <Button 
              type="primary" 
              htmlType="submit"
              style={{ 
                width: '100%', 
                height: '48px', 
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #007fbe 0%, #005a8b 100%)',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0, 123, 190, 0.3)'
              }}
            >
              Create Account
            </Button>
          </Form.Item>

          <Divider style={{ margin: '1.5rem 0' }}>
            <Text type="secondary">Already have an account?</Text>
          </Divider>

          <div style={{ textAlign: 'center' }}>
            <Link 
              to="/login"
              style={{ 
                color: '#007fbe',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                padding: '12px 24px',
                border: '2px solid #007fbe',
                borderRadius: '8px',
                display: 'inline-block',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#007fbe';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#007fbe';
              }}
            >
              Sign In Instead
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
