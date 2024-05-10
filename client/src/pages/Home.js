import React from "react";
import Title from "../components/Title";
import { useSelector } from "react-redux";
import chip from "../assets/chip.png";
import Man from "../assets/Man.jpg";
import Woman from "../assets/Woman.jpg";
import "../style/Home.css";

const Home = () => {
  const { user } = useSelector((state) => state.users);
  const lastFourDigits = user._id.slice(-4);
  return (
    <div style={{ textAlign: "center" }} className="main">
      <Title title={` Namaste, ${user.firstName} ${user.lastName}`} />
      <h2>
        Welcome to <span style={{ color: "#faaa20" }}>Xpen$e</span>
      </h2>
      <div className="home-div">
        <img src={Man} alt="" className="man" />
        <div className="info-div">
          <div className="balance-div">
            <div className="balance">
              <h4>Current Balance</h4>
              <h5>₹{user.balance || 0}</h5>
            </div>
            <div className="chip">
              <img src={chip} alt="" className="chip-img" />
            </div>
          </div>
          <div className="acc-div">
            <h4>Account Number</h4>
            <h5 style={{ textTransform: "uppercase" }}>
              **** **** **** {lastFourDigits}
            </h5>
          </div>
          <div className="name-div">
            <div className="name">
              <p>
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div className="card-name">
              <p style={{ color: "#faaa20" }}>Xpen$e</p>
            </div>
          </div>
        </div>
        <img src={Woman} alt="" className="woman" />
      </div>
    </div>
  );
};

export default Home;
