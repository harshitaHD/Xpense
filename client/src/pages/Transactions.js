import React from "react";
import { Button, Space, Table } from "antd";
import Title from "../components/Title";

const Transactions = () => {
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
          <Button type="primary" className="primary-outlined-btn">
            Deposit
          </Button>
          <Button type="primary" className="primary-contained-btn">
            Transfer
          </Button>
        </Space>
      </div>
      <Table columns={colums} dataSource={[]} className="mt-3" />
    </div>
  );
};

export default Transactions;
