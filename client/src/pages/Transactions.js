// import React, { useEffect } from "react";
// import { Button, Space, Table, message } from "antd";
// import Title from "../components/Title";
// import TransferFundModal from "./TransferFundModal";
// import { useDispatch, useSelector } from "react-redux";
// import { HideLoading, ShowLoading } from "../redux/loadersSlice";
// import { GetTransactionsOfUsers } from "../api/transactions";
// import moment from "moment";
// import DepositModal from "./DepositModal";

// const Transactions = () => {
//   const [showTransferFundModal, setShowTransferFundModal] =
//     React.useState(false);
//   const [showDepositModal, setShowDepositModal] = React.useState(false);
//   const [data = [], setData] = React.useState([]);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.users);
//   const colums = [
//     {
//       title: "Date",
//       dataIndex: "date",
//       render: (text, record) => {
//         return moment(record.createdAt).format("DD-MM-YYYY | hh:mm:ss A");
//       },
//     },
//     {
//       title: "Transaction ID",
//       dataIndex: "_id",
//     },
//     {
//       title: "Amount",
//       dataIndex: "amount",
//     },
//     {
//       title: "Type",
//       dataIndex: "type",
//       render: (text, record) => {
//         return record.sender._id === user._id ? "Debit" : "Credit";
//       },
//     },
//     {
//       title: "Reference Account",
//       dataIndex: "",
//       render: (text, record) => {
//         return record.sender._id === user._id ? (
//           <div>
//             <p style={{ marginTop: "15px" }}>
//               {record.receiver.firstName} {record.receiver.lastName}
//             </p>
//           </div>
//         ) : (
//           <div>
//             <p style={{ marginTop: "15px" }}>
//               {record.sender.firstName} {record.sender.lastName}
//             </p>
//           </div>
//         );
//       },
//     },
//     {
//       title: "Reference",
//       dataIndex: "reference",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       render: (text, record) => (
//         <span
//           style={{
//             color: record.status === "success" ? "#3c763d" : "inherit",
//             display: "inline-block",
//             padding: "5px 10px",
//             borderRadius: "20px",
//             border:
//               record.status === "success" ? "1.5px solid  #3c763d" : "inherit",
//             background: record.status === "success" ? "#d3f2d1" : "none",
//           }}
//         >
//           {text}
//         </span>
//       ),
//     },
//   ];
//   const getData = async () => {
//     try {
//       dispatch(ShowLoading());
//       const response = await GetTransactionsOfUsers();
//       if (response.success) {
//         setData(response.data);
//       }
//       dispatch(HideLoading());
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);
//   return (
//     <div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "16px",
//         }}
//       >
//         <Title title="Transactions" />
//         <Space>
//           <Button
//             type="text"
//             style={{ border: "1px solid black", height: "40px" }}
//             onClick={() => setShowDepositModal(true)}
//           >
//             Deposit
//           </Button>
//           <Button
//             type="primary"
//             style={{ backgroundColor: "#012641", height: "40px" }}
//             onClick={() => setShowTransferFundModal(true)}
//           >
//             Transfer
//           </Button>
//         </Space>
//       </div>
//       <Table columns={colums} dataSource={data} className="mt-3" />
//       {showTransferFundModal && (
//         <TransferFundModal
//           showTransferFundModal={showTransferFundModal}
//           setShowTransferFundModal={setShowTransferFundModal}
//         />
//       )}
//       {showDepositModal && (
//         <DepositModal
//           showDepositModal={showDepositModal}
//           setShowDepositModal={setShowDepositModal}
//         />
//       )}
//     </div>
//   );
// };

// export default Transactions;

import React, { useEffect, useState } from "react";
import { Button, Space, Table, message } from "antd";
import Title from "../components/Title";
import TransferFundModal from "./TransferFundModal";
import DepositModal from "./DepositModal";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import { GetTransactionsOfUsers } from "../api/transactions";
import moment from "moment";

const Transactions = () => {
  const [showTransferFundModal, setShowTransferFundModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const columns = [
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
      render: (text, record) => (
        <span
          style={{
            color: record.status === "success" ? "#3c763d" : "inherit",
            display: "inline-block",
            padding: "5px 10px",
            borderRadius: "20px",
            border:
              record.status === "success" ? "1.5px solid #3c763d" : "inherit",
            background: record.status === "success" ? "#d3f2d1" : "transparent",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Receipt",
      render: (text, record) => (
        <Button
          onClick={() => printReceipt(record)}
          style={{
            display: "inline-block",
            padding: "5px 10px",
            borderRadius: "20px",
            color: "#0d88d9",
            border: "1.5px solid #0d88d9",
            backgroundColor: "#cfeffc",
          }}
        >
          Receipt
        </Button>
      ),
    },
  ];

  const printReceipt = (record) => {
    const { date, _id, amount, status, reference, sender, receiver } = record;
    const receiptContent = `
      Date: ${moment(date).format("DD-MM-YYYY")}

      Time: ${moment(date).format("hh:mm:ss A")}

      Transaction ID: ${_id}

      Amount: ${amount}

      Status: ${status}

      Reference: ${reference}

      Sender: ${sender.firstName} ${sender.lastName}

      Sender Id: ${sender._id}

      Receiver: ${receiver.firstName} ${receiver.lastName}

      Receiver Id: ${receiver._id}
    `;

    const receiptWindow = window.open(
      "",
      "Receipt",
      "width=600,height=400,resizable=yes,scrollbars=yes"
    );
    if (receiptWindow) {
      receiptWindow.document.write(`<pre>${receiptContent}</pre>`);
      receiptWindow.document.close();
    } else {
      alert("Please allow pop-ups to print the receipt.");
    }
  };

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
            onClick={() => setShowDepositModal(true)}
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
      <Table columns={columns} dataSource={data} />
      {showTransferFundModal && (
        <TransferFundModal
          showTransferFundModal={showTransferFundModal}
          setShowTransferFundModal={setShowTransferFundModal}
        />
      )}
      {showDepositModal && (
        <DepositModal
          showDepositModal={showDepositModal}
          setShowDepositModal={setShowDepositModal}
        />
      )}
    </div>
  );
};

export default Transactions;
