import React from "react";
import { Button, Form, Input, Modal, Space } from "antd";
import ReactStripeCheckout from "react-stripe-checkout";

function DepositModal({ showDepositModal, setShowDepositModal, reloadData }) {
  const [form] = Form.useForm();

  const onToken = (token) => {
    console.log(token);
  };

  return (
    <Modal
      title="Deposit"
      visible={showDepositModal}
      onCancel={() => setShowDepositModal(false)}
      footer={null}
    >
      <Form layout="vertical" form={form}>
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
          <ReactStripeCheckout
            token={onToken}
            currency="USD"
            amount={form.getFieldValue("amount") * 100}
            shippingAddress
            stripeKey="pk_test_51OuasYSGv9mg4SRiJa50nfkDA0DhYX5grvFJdyeTqQR2WGjnmliq7fp2rWGsdEP6PshFV55XRHEN3LvqwChUH0qV00FD0L2Gxy"
          >
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
          </ReactStripeCheckout>
        </Space>
      </Form>
    </Modal>
  );
}

export default DepositModal;
