import { Card } from "antd";
import React from "react";
import "./FormComponent.css";
import welcome from "../../assets/welcome.jpg";
import Meta from "antd/es/card/Meta";
const FormComponent = ({ Child }) => {
  return (
    <div className="main">
      <div className="formClass">{Child}</div>
      <div className="cardClass">
        <Card
          style={{ width: "100%", height: "100%" }}
          cover={<img src={welcome} alt="oops" />}
        >
          <Meta style={{ textAlign: "center", fontWeight: "bold" }} />
        </Card>
      </div>
    </div>
  );
};

export default FormComponent;
