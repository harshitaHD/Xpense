import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DefaultLayout = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const userMenu = [
    {
      title: "Home",
      icon: <i className="ri-home-2-line" />,
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "Transactions",
      icon: <i className="ri-bank-line" />,
      onClick: () => navigate("/transactions"),
      path: "/transactions",
    },
    {
      title: "Requests",
      icon: <i className="ri-hand-heart-line" />,
      onClick: () => navigate("/requests"),
      path: "/requests",
    },
    {
      title: "Profile",
      icon: <i className="ri-user-heart-line" />,
      onClick: () => navigate("/profile"),
      path: "/profile",
    },
    {
      title: "Logout",
      icon: <i className="ri-logout-box-r-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/logout",
    },
  ];

  const adminMenu = [
    {
      title: "Home",
      icon: <i className="ri-home-2-line" />,
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "Users",
      icon: <i className="ri-group-line" />,
      onClick: () => navigate("/users"),
      path: "/users",
    },
    {
      title: "Transactions",
      icon: <i className="ri-bank-line" />,
      onClick: () => navigate("/transactions"),
      path: "/transactions",
    },
    {
      title: "Requests",
      icon: <i className="ri-hand-heart-line" />,
      onClick: () => navigate("/requests"),
      path: "/requests",
    },
    {
      title: "Profile",
      icon: <i className="ri-user-heart-line" />,
      onClick: () => navigate("/profile"),
      path: "/profile",
    },
    {
      title: "Logout",
      icon: <i className="ri-logout-box-r-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/logout",
    },
  ];

  const menuToRender = user?.isAdmin ? adminMenu : userMenu;
  return (
    <div className="layout">
      <div className="body">
        <div className="header">
          <div className="navbar">
            {menuToRender.map((item, index) => {
              const isActive = window.location.pathname === item.path;
              return (
                <div
                  key={index}
                  className={`menu-item ${isActive ? "active-menu-item" : " "}`}
                  onClick={item.onClick}
                >
                  {item.icon} {item.title}
                </div>
              );
            })}
          </div>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
