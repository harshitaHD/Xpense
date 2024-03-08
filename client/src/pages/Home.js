import React, { useEffect } from "react";
import { message } from "antd";
import { GetUserInfo } from "../api/users";

const Home = () => {
  const [userData, setUserData] = React.useState(null);

  const getData = async () => {
    try {
      const response = await GetUserInfo();
      if (response.success) {
        setUserData(response.data);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
