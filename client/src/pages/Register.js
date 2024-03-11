import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row, Select, message } from "antd";
import join from "../assets/join.jpg";
import "../style/App.css";
import { RegisterUser } from "../api/users";

const Register = () => {
  const navigate = useNavigate();
  const { Option } = Select;
  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div>
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col xs={24} sm={12}>
          <div
            style={{
              padding: "20px",
              marginLeft: "10%",
              marginRight: "10%",
            }}
          >
            <h2>
              Begin your <span style={{ color: "#faaa20" }}>Xpen$e</span>{" "}
              journey
            </h2>
            <Form.Item>
              <Link
                to="/login"
                style={{
                  fontSize: "16px",
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "black",
                }}
              >
                Already a Member? Sign Into Your Account
              </Link>
            </Form.Item>
            <Form layout="vertical" onFinish={onFinish}>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your first name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your last name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                    ]}
                  >
                    <Input type="email" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your phone number",
                      },
                    ]}
                  >
                    <Input type="phone" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Identification Type"
                    name="identificationType"
                    rules={[
                      {
                        required: true,
                        message: "Please select identification type",
                      },
                    ]}
                  >
                    <Select>
                      <Option value="passport">Passport</Option>
                      <Option value="driverLicense">Driver's License</Option>
                      <Option value="national_Id">Aadhaar Card</Option>
                      <Option value="pan_card">PAN Card</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Identification Number"
                    name="identificationNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please enter identification number",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your address",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Please enter your password" },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button htmlType="submit" className="register-btn">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col xs={24} sm={10}>
          <div style={{ padding: "10px", textAlign: "center" }}>
            <img src={join} alt="Registration" style={{ maxWidth: "100%" }} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
