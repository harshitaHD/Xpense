import React from "react";
import Title from "../components/Title";
import { useSelector } from "react-redux";
import profile from "../assets/profile.svg";
import chip from "../assets/chip.png";
import "../style/Home.css";

const Home = () => {
  const { user } = useSelector((state) => state.users);
  const lastFourDigits = user._id.slice(-4);
  // const dispatch = useDispatch();
  return (
    <div style={{ textAlign: "center" }}>
      <img src={profile} alt=" " className="profile-img" />
      <Title title={` Namaste, ${user.firstName} ${user.lastName}`} />
      <h2>
        Welcome to <span style={{ color: "#faaa20" }}>Xpen$e</span>
      </h2>
      <div className="info-div">
        <div className="balance-div">
          <div className="balance">
            <h4>Card Balance</h4>
            <h5>₹{user.balance || 0}</h5>
          </div>
          <div className="chip">
            <img src={chip} alt="" className="chip-img" />
          </div>
        </div>
        <div className="acc-div">
          <h4>Account Number</h4>
          <h5 style={{ textTransform: "uppercase" }}>
            XXXX-XXXX-XXXX-{lastFourDigits}
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
    </div>
  );
};

export default Home;
