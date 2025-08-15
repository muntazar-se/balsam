import { Button, Col, Form, Input, Row, TimePicker, Select } from "antd";
import React, { useState } from "react";
import countryCityData from "./countryCityData.json";

const { Option, OptGroup } = Select;

function DoctorForm({ onFinish, initialValues }) {
  const [form] = Form.useForm();
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleFinish = (values) => {
    console.log("Form values:", values); // Log the form values
    onFinish(values);
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    form.setFieldsValue({ city: undefined }); // Reset city value when country changes
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={initialValues}
    >
      <h1 className="card-title mt-3">Personal Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true }]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Country"
            name="country"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select a country"
              onChange={handleCountryChange}
            >
              {countryCityData.countries.map((country) => (
                <Option key={country.name} value={country.name}>
                  {country.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="City"
            name="city"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select a city" disabled={!selectedCountry}>
              {selectedCountry &&
                countryCityData.countries
                  .find((country) => country.name === selectedCountry)
                  ?.cities.map((city) => (
                    <Option key={city} value={city}>
                      {city}
                    </Option>
                  ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
        </Col>
      </Row>
      <hr />
      <h1 className="card-title mt-3">Professional Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Specialization"
            name="specialization"
            rules={[{ required: true }]}
          >
            <Input placeholder="Specialization" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Experience"
            name="experience"
            rules={[{ required: true }]}
          >
            <Input placeholder="Experience" type="number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Fee Per Consultation$"
            name="feePerConsultation"
            rules={[{ required: true }]}
          >
            <Input placeholder="Fee Per Consultation" type="number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Timings"
            name="timings"
            rules={[{ required: true }]}
          >
            <TimePicker.RangePicker format="HH:mm" />
          </Form.Item>
        </Col>

      </Row>
      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          SUBMIT
        </Button>
      </div>
    </Form>
  );
}

export default DoctorForm;
