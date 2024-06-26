import React, { useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { TransferFunds, VerifyAccount } from "../api/transactions";
import { ShowLoading, HideLoading } from "../redux/loadersSlice";
import { ReloadUser } from "../redux/usersSlice";

const TransferFundModal = ({
  showTransferFundModal,
  setShowTransferFundModal,
  reloadData,
}) => {
  const { user } = useSelector((state) => state.users);
  const [isVerified, setIsVerified] = useState(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const verifyAccount = async () => {
    try {
      dispatch(ShowLoading());
      const response = await VerifyAccount({
        receiver: form.getFieldValue("receiver"),
      });
      dispatch(HideLoading());
      setIsVerified(response.success);
    } catch (error) {
      dispatch(HideLoading());
      setIsVerified(false);
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
      const response = await TransferFunds(payload);

      if (response.success) {
        reloadData();
        setShowTransferFundModal(false);
        message.success(response.message);
        dispatch(ReloadUser(true));
      } else {
        message.error(response.message);
      }

      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  const validateAmount = (_, value) => {
    if (value && Number(value) > user.balance) {
      return Promise.reject("Insufficient Balance");
    }
    return Promise.resolve();
  };

  return (
    <Modal
      title="Transfer Fund"
      visible={showTransferFundModal}
      onCancel={() => setShowTransferFundModal(false)}
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

        {isVerified === true && (
          <div className="success-bg">Account Verified Successfully</div>
        )}

        {isVerified === false && (
          <div className="error-bg">Invalid Account</div>
        )}

        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please enter amount" },
            { validator: validateAmount },
          ]}
        >
          <Input
            type="number"
            placeholder="Enter amount"
            style={{ height: "40px" }}
          />
        </Form.Item>

        <Form.Item
          label="Reference"
          name="reference"
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
            onClick={() => setShowTransferFundModal(false)}
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
            Transfer
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};

export default TransferFundModal;
