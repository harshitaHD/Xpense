import React, { useState } from "react";
import "../style/Profile.css";
import { useSelector } from "react-redux";
import { Button, Form, Input, message, Row, Col } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { updateUserProfile } from "../api/users";
import update from "../assets/update.jpg";

const Profile = () => {
  const { user } = useSelector((state) => state.users);
  const [form] = Form.useForm();
  const [copied, setCopied] = useState(false);

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
    <div className="main-profile-div">
      <Row justify="center" align="middle" style={{ minHeight: "80vh" }}>
        <Col xs={24} sm={12}>
          <div
            style={{
              margin: "20px",
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
                  <Form.Item label="Account Number" name="user_id">
                    <Input readOnly placeholder={user._id} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={1}>
                  <CopyToClipboard
                    text={user._id}
                    onCopy={() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                  >
                    <Button
                      icon={<i className="ri-file-copy-line" />}
                      style={{ marginTop: "31px" }}
                    />
                  </CopyToClipboard>
                  {copied && (
                    <span style={{ marginLeft: 5 }}>
                      {message.success("Copied!")}
                    </span>
                  )}
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item label="First Name" name="firstName">
                    <Input readOnly placeholder={user.firstName} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Last Name" name="lastName">
                    <Input readOnly placeholder={user.lastName} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item label="Email" name="email">
                    <Input type="email" placeholder={user.email} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Phone Number" name="phoneNumber">
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
                    <Input readOnly placeholder={user.identificationType} />
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
                    <Input readOnly placeholder={user.identificationNumber} />
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

              <Form.Item style={{ textAlign: "left" }}>
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
        <Col xs={24} sm={8}>
          <div style={{ padding: "10px", textAlign: "center" }}>
            <img src={update} alt="Update" style={{ maxWidth: "100%" }} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
