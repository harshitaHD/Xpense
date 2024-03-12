import React from "react";
import { Button, Space, Table } from "antd";
import Title from "../components/Title";
import TransferFundModal from "./TransferFundModal";

const Transactions = () => {
  const [showTransferFundModal, setShowTransferFundModal] =
    React.useState(false);
  const colums = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Title title="Transactions" />
        <Space>
          <Button
            type="text"
            style={{ border: "1px solid black", height: "40px" }}
          >
            Deposit
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "#012641", height: "40px" }}
            onClick={() => setShowTransferFundModal(true)}
          >
            Transfer
          </Button>
        </Space>
      </div>
      <Table columns={colums} dataSource={[]} className="mt-3" />
      {showTransferFundModal && (
        <TransferFundModal
          showTransferFundModal={showTransferFundModal}
          setShowTransferFundModal={setShowTransferFundModal}
        />
      )}
    </div>
  );
};

export default Transactions;
