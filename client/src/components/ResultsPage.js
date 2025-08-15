// src/components/ResultsPage.js

import React from "react";
import Doctor from "./Doctor";
import { Col, Row } from "antd";

const ResultsPage = ({ doctors = [] }) => {
  if (!doctors.length) {
    return <div>No doctors found</div>;
  }

  return (
    <Row gutter={20}>
      {doctors.map((doctor) => (
        <Col span={8} xs={24} sm={24} lg={8} key={doctor._id}>
          <Doctor doctor={doctor} />
        </Col>
      ))}
    </Row>
  );
};

export default ResultsPage;
