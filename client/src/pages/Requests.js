import React, { useEffect } from "react";
import Title from "../components/Title";
import { Button, Space, Table, Tabs, message } from "antd";
import NewRequestModal from "./NewRequestModal";
import { getAllRequestsByUser } from "../api/requests";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";

const { TabPane } = Tabs;

const Requests = () => {
  const [data, setData] = React.useState([]);
  const [showNewRequestModal, setShowNewRequestModal] = React.useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const columns = [
    {
      title: "Request ID",
      dataIndex: "_id",
    },
    {
      title: "User",
      dataIndex: "sender",
      render(sender) {
        return sender.firstName + " " + sender.lastName;
      },
    },
    {
      title: "Receiver",
      dataIndex: "receiver",
      render(receiver) {
        return receiver.firstName + " " + receiver.lastName;
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      render(text, record) {
        return moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A");
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllRequestsByUser();
      if (response.success) {
        const sendData = response.data.filter(
          (item) => item.sender._id === user._id
        );
        const receivedData = response.data.filter(
          (item) => item.receiver._id === user._id
        );
        setData({
          sent: sendData,
          received: receivedData,
        });
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
        <Title title="Requests" />
        <Space>
          <Button
            style={{ border: "1px solid black", height: "40px" }}
            onClick={() => setShowNewRequestModal(true)}
          >
            Request Funds
          </Button>
        </Space>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Sent" key="1">
          <Table columns={columns} dataSource={data.sent} />
        </TabPane>
        <TabPane tab="Received" key="2">
          <Table columns={columns} dataSource={data.received} />
        </TabPane>
      </Tabs>
      {showNewRequestModal && (
        <NewRequestModal
          showNewRequestModal={showNewRequestModal}
          setShowNewRequestModal={setShowNewRequestModal}
        />
      )}
    </div>
  );
};

export default Requests;
