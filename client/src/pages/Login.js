// User login page

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row, message } from "antd";
import authentication from "../assets/authentication.jpg";
import "../style/App.css";
import { LoginUser } from "../api/users";

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.token);
        navigate("/");
        // console.log("working");
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
        <Col xs={24} sm={8}>
          <div style={{ padding: "10px", textAlign: "center" }}>
            <img
              src={authentication}
              alt="Registration"
              style={{ maxWidth: "100%" }}
            />
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <div
            style={{
              padding: "20px",
              marginLeft: "10%",
              marginRight: "10%",
            }}
          >
            <h2>
              Welcome Back to <span style={{ color: "#189618" }}>Xpen$e</span>
            </h2>
            <Form.Item>
              <Link
                to="/register"
                style={{
                  fontSize: "16px",
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "black",
                }}
              >
                New User? Register here!
              </Link>
            </Form.Item>
            <Form layout="vertical" onFinish={onFinish}>
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
              </Row>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-btn">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
