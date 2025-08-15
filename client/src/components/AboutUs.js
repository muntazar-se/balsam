import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const AboutUs = () => (
  <Layout>
    <Content style={{ padding: '50px', textAlign: 'center' }}>
      <h1>About Us</h1>
      <p>Information about Balsam.</p>
    </Content>
  </Layout>
);

export default AboutUs;
