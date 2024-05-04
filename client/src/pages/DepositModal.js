import React from "react";
import { Button, Form, Input, Modal, Space, message } from "antd";
import ReactStripeCheckout from "react-stripe-checkout";
import { DepositFunds } from "../api/transactions";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";

function DepositModal({ showDepositModal, setShowDepositModal, reloadData }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await DepositFunds({
        token,
        amount: form.getFieldValue("amount"),
      });
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
      message.error(error.message);
    }
  };

  return (
    <Modal
      title="Deposit"
      open={showDepositModal}
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
            currency="INR"
            amount={form.getFieldValue("amount") * 1000}
            shippingAddress
            billingAddress
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
