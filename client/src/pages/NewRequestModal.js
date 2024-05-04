import React from "react";
import { Button, Col, Form, Input, Modal, Row, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { VerifyAccount } from "../api/transactions";

import { ShowLoading, HideLoading } from "../redux/loadersSlice";
import { sendRequest } from "../api/requests";

const NewRequestModal = ({
  showNewRequestModal,
  setShowNewRequestModal,
  reloadData,
}) => {
  const { user } = useSelector((state) => state.users);
  const [isVerified, setIsVerified] = React.useState(" ");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const verifyAccount = async () => {
    try {
      dispatch(ShowLoading());
      const response = await VerifyAccount({
        receiver: form.getFieldValue("receiver"),
      });
      dispatch(HideLoading());
      if (response.success) {
        setIsVerified("true");
      } else {
        setIsVerified("false");
      }
    } catch (error) {
      dispatch(HideLoading);
      setIsVerified("false");
    }
  };
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const payload = {
        ...values,
        sender: user._id,
        reference: values.reference || "No reference",
        status: "success",
      };
      const response = await sendRequest(payload);
      if (response.success) {
        reloadData();
        setShowNewRequestModal(false);
        message.success(response.message);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };
  return (
    <Modal
      title="Transfer Fund"
      open={showNewRequestModal}
      onCancel={() => setShowNewRequestModal(false)}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col flex="auto">
            <Form.Item
              label="Account Number"
              name="receiver"
              rules={[
                { required: true, message: "Please enter account number" },
              ]}
            >
              <Input
                placeholder="Enter account number"
                style={{ height: "40px" }}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#012641",
                  height: "40px",
                  marginTop: "30px",
                  color: "white",
                  borderRadius: "5px",
                }}
                onClick={verifyAccount}
              >
                Verify
              </Button>
            </Form.Item>
          </Col>
        </Row>

        {isVerified === "true" && (
          <div className="success-bg">Account Verified Successfully</div>
        )}

        {isVerified === "false" && (
          <div className="error-bg">Invalid Account</div>
        )}
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please enter amount" },
            { max: user.balance, message: "Insufficient Balance" },
          ]}
        >
          <Input
            type="number"
            placeholder="Enter amount"
            style={{ height: "40px" }}
          />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { max: 100, message: "Description cannot exceed 100 characters" },
          ]}
        >
          <Input.TextArea
            placeholder="Enter description (max 100 characters)"
            rows={4}
          />
        </Form.Item>
        <Space>
          <Button
            type="text"
            style={{ border: "1px solid black", height: "40px" }}
            onClick={() => setShowNewRequestModal(false)}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#012641",
              color: "white",
              height: "40px",
            }}
          >
            Request
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};

export default NewRequestModal;
