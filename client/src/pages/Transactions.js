import React, { useEffect } from "react";
import { Button, Space, Table, message } from "antd";
import Title from "../components/Title";
import TransferFundModal from "./TransferFundModal";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import { GetTransactionsOfUsers } from "../api/transactions";
import moment from "moment";

const Transactions = () => {
  const [showTransferFundModal, setShowTransferFundModal] =
    React.useState(false);
  const [data = [], setData] = React.useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const colums = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return moment(record.createdAt).format("DD-MM-YYYY | hh:mm:ss A");
      },
    },
    {
      title: "Transaction ID",
      dataIndex: "_id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record) => {
        return record.sender._id === user._id ? "Debit" : "Credit";
      },
    },
    {
      title: "Reference Account",
      dataIndex: "",
      render: (text, record) => {
        return record.sender._id === user._id ? (
          <div>
            <p style={{ marginTop: "15px" }}>
              {record.receiver.firstName} {record.receiver.lastName}
            </p>
          </div>
        ) : (
          <div>
            <p style={{ marginTop: "15px" }}>
              {record.sender.firstName} {record.sender.lastName}
            </p>
          </div>
        );
      },
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
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetTransactionsOfUsers();
      if (response.success) {
        setData(response.data);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
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
      <Table columns={colums} dataSource={data} className="mt-3" />
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
