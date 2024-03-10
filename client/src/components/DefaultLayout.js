import { Col, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const DefaultLayout = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  return (
    <div className="layout">
      <div className="body">
        <div className="header">
          <Row justify="space-between" align="middle">
            <Col span={8} className="logo">
              logo
            </Col>
            <Col span={8} className="title">
              <h2>
                <span style={{ color: "#189618" }}>Xpen$e</span>
              </h2>
            </Col>
            <Col span={8} className="user">
              {user.firstName} {user.lastName}
            </Col>
          </Row>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
