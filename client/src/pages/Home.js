import React from "react";
import Title from "../components/Title";
import { useSelector } from "react-redux";
import home from "../assets/home.jpg";

const Home = () => {
  const { user } = useSelector((state) => state.users);
  // const dispatch = useDispatch();
  return (
    <div style={{ textAlign: "center" }}>
      <Title title={` Namaste ${user.firstName} ${user.lastName},`} />
      <h2>
        Welcome to <span style={{ color: "#faaa20" }}>Xpen$e</span>
      </h2>
      <div className="info-div">
        <div style={{ display: "flex" }}>
          <h4>
            <i className="ri-account-circle-line" /> Account Number
          </h4>
          <h4 style={{ textTransform: "uppercase" }}> {user._id}</h4>
        </div>
        <div style={{ display: "flex" }}>
          <h4>
            <i className="ri-money-rupee-circle-line" /> Balance
          </h4>
          <h4>₹{user.balance || 0}</h4>
        </div>
        <div style={{ display: "flex" }}>
          <h4>
            <i className="ri-mail-line" /> Email
          </h4>
          <h4> {user.email}</h4>
        </div>
        <div style={{ display: "flex" }}>
          <h4>
            <i className="ri-phone-line" /> Mobile
          </h4>
          <h4> {user.phoneNumber}</h4>
        </div>
        <div style={{ display: "flex" }}>
          <h4>
            <i className="ri-id-card-line" /> Identification Number
          </h4>
          <h4>{user.identificationNumber}</h4>
        </div>
      </div>
      <div className="img-home">
        <img src={home} alt="" />
      </div>
    </div>
  );
};

export default Home;
