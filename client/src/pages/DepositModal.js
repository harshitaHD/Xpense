import React from "react";
import { Button, Form, Input, Modal, Space, message } from "antd";
import { DepositFunds } from "../api/transactions";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";

function DepositModal({ showDepositModal, setShowDepositModal, reloadData }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleDeposit = async () => {
    try {
      dispatch(ShowLoading());
      const values = await form.validateFields();
      const response = await DepositFunds({ amount: values.amount });
      dispatch(HideLoading());

      if (response.success) {
        reloadData();
        setShowDepositModal(false);
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error("An error occurred while depositing funds");
    }
  };

  return (
    <Modal
      title="Deposit"
      open={showDepositModal}
      onCancel={() => setShowDepositModal(false)}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={handleDeposit}>
        <Form.Item
          label="Account Number"
          name="receiver"
          rules={[
            { required: true, message: "Please enter your account number" },
          ]}
        >
          <Input
            placeholder="Enter account number"
            style={{ height: "40px" }}
          />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Please input amount" }]}
        >
          <Input
            type="number"
            placeholder="Enter amount"
            style={{ height: "40px" }}
          />
        </Form.Item>
        <Space>
          <Button
            type="text"
            style={{ border: "1px solid black", height: "40px" }}
            onClick={() => setShowDepositModal(false)}
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
            Deposit
          </Button>
        </Space>
      </Form>
    </Modal>
  );
}

export default DepositModal;
