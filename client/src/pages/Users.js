import React, { useEffect } from "react";
import { Button, Table, message } from "antd";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import { useDispatch } from "react-redux";
import { GetAllUsers, UpdateUserVerifiedStatus } from "../api/users";
import Title from "../components/Title";

const Users = () => {
  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllUsers();
      dispatch(HideLoading());
      if (response.success) {
        setUsers(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const updateStatus = async (record, isVerified) => {
    try {
      dispatch(ShowLoading());
      const response = await UpdateUserVerifiedStatus({
        selectedUser: record._id,
        isVerified,
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Verified",
      dataIndex: "isVerified",
      render: (text, record) => {
        return text ? "Yes" : "No";
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div>
            {record.isVerified ? (
              <Button
                onClick={() => updateStatus(record, false)}
                style={{
                  border: "1px solid black",
                  height: "40px",
                  color: "red",
                }}
              >
                Suspend
              </Button>
            ) : (
              <Button
                onClick={() => updateStatus(record, true)}
                style={{
                  border: "1px solid black",
                  height: "40px",
                  color: "green",
                }}
              >
                Activate
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Title title="Users" />
      <Table
        dataSource={users}
        columns={columns}
        style={{ marginTop: "25px" }}
        rowKey="_id"
      />
    </div>
  );
};

export default Users;
