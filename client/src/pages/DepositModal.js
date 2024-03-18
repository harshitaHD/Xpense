import React from "react";
import { Button, Form, Input, Modal, Space } from "antd";

const DepositModal = ({
  showDepositModal,
  setShowDepositModal,
  reloadData,
}) => {
  return (
    <Modal
      title="Deposit"
      open={showDepositModal}
      onCancel={() => setShowDepositModal(false)}
      footer={null}
    >
      <Form layout="vertical">
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
};

export default DepositModal;
