import React from 'react';
import { Layout, Menu, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import '/Users/muntadher/Desktop/School/BalsamProject_1_1  copy/client/src/LandingPage.css';

const { Header, Content, Footer } = Layout;

const LandingPage = () => {
    return (
      <Layout className="landing-layout">
        <Header>
          <div className="logo">Balsam</div>
          <Menu theme="dark" mode="horizontal" style={{ float: 'right' }}>
            <Menu.Item key="1"><Link to="/login">Login</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/register">Register</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/about">About Us</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/contact">Contact Us</Link></Menu.Item>
          </Menu>
        </Header>
        <Content className="landing-content">
          <div className="landing-intro">
            <h1>Welcome to Balsam</h1>
            <p>Your reliable platform for booking doctor appointments.</p>
            <Button type="primary" size="large"><Link to="/register">Get Started</Link></Button>
          </div>
          <Row gutter={[16, 16]} className="landing-info">
            <Col span={8}>
              <img src="https://images.unsplash.com/photo-1537368910025-700350fe46c7" alt="Doctor 1" className="landing-image" />
              <h3>Expert Doctors</h3>
              <p>Find experienced and specialized doctors near you.</p>
            </Col>
            <Col span={8}>
              <img src="https://images.unsplash.com/photo-1580281658629-2135c943a1fa" alt="Doctor 2" className="landing-image" />
              <h3>Easy Booking</h3>
              <p>Book appointments at your convenience with a few clicks.</p>
            </Col>
            <Col span={8}>
              <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528" alt="Doctor 3" className="landing-image" />
              <h3>24/7 Support</h3>
              <p>We offer round-the-clock support for all your needs.</p>
            </Col>
          </Row>
        </Content>
        <Footer className="landing-footer">
          <p>Balsam ©2024 Created by YourName</p>
        </Footer>
      </Layout>
    );
  };
  
  export default LandingPage;
