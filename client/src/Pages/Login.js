import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Card, Typography, Space, Divider } from "antd";
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { apiService } from "../config/apiConfig";

const { Title, Text, Paragraph } = Typography;

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      
      let response;
      if (apiService) {
        response = await apiService.login(values);
      } else {
        const axios = require('axios');
        response = await axios.post("/api/user/login", values);
      }
      
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        navigate("/home");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      const errorMessage = error.response?.data?.message || error.message || "Login failed";
      toast.error(errorMessage);
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
            <LoginOutlined style={{ fontSize: '32px', color: 'white' }} />
          </div>
          <Title level={2} style={{ color: '#1e293b', marginBottom: '0.5rem' }}>
            Welcome Back
          </Title>
          <Paragraph style={{ color: '#64748b', fontSize: '16px', margin: 0 }}>
            Sign in to your Balsam Healthcare account
          </Paragraph>
        </div>

        <Form
          layout="vertical"
          onFinish={onFinish}
          size="large"
        >
          <Form.Item 
            label="Email Address" 
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: '#cbd5e1' }} />}
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
              placeholder="Enter your password"
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
              Sign In
            </Button>
          </Form.Item>

          <Divider style={{ margin: '1.5rem 0' }}>
            <Text type="secondary">Don't have an account?</Text>
          </Divider>

          <div style={{ textAlign: 'center' }}>
            <Link 
              to="/register"
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
              Create New Account
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
