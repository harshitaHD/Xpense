import React from "react";
import "../style/Profile.css";
import { useSelector } from "react-redux";
import { Button, Form, Input, message, Row, Col } from "antd";
import { updateUserProfile } from "../api/users";

const Profile = () => {
  const { user } = useSelector((state) => state.users);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await updateUserProfile(user._id, values);
      if (response.success) {
        message.success("Profile updated successfully");
      } else {
        message.error("Failed to update profile");
      }
    } catch (error) {
      message.error("An error occurred while updating profile");
    }
  };

  return (
    <div style={{ textAlign: "center" }} className="main-profile-div">
      <Row justify="center">
        <Col xs={24} sm={12}>
          <div
            style={{
              padding: "20px",
              marginLeft: "10%",
              marginRight: "10%",
            }}
          >
            <Form
              form={form}
              layout="vertical"
              initialValues={user}
              onFinish={onFinish}
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        message: "Please enter your first name",
                      },
                    ]}
                  >
                    <Input disabled placeholder={user.firstName} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      {
                        message: "Please enter your last name",
                      },
                    ]}
                  >
                    <Input disabled placeholder={user.lastName} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ message: "Please enter your email" }]}
                  >
                    <Input type="email" placeholder={user.email} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[
                      {
                        message: "Please enter your phone number",
                      },
                    ]}
                  >
                    <Input type="phone" placeholder={user.phoneNumber} />
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
                        message: "Please select identification type",
                      },
                    ]}
                  >
                    <Input disabled placeholder={user.identificationType} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Identification Number"
                    name="identificationNumber"
                    rules={[
                      {
                        message: "Please enter identification number",
                      },
                    ]}
                  >
                    <Input disabled placeholder={user.identificationNumber} />
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
                        message: "Please enter your address",
                      },
                    ]}
                  >
                    <Input placeholder={user.address} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button
                  htmlType="submit"
                  className="update-btn"
                  style={{
                    backgroundColor: "#012641",
                    color: "white",
                    height: "40px",
                  }}
                >
                  Update
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
