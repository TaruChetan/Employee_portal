import React from "react";
import { Button, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../store/slices/slice";
import { localLanguage, routerConstants } from "../../utils/constants";
const EmployeeDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.mainReducer);
  const empData = data?.user.filter((item) => item.isLogin);
  const handleLogOut = () => {
    dispatch(userLogout(empData[0]?.email));
    navigate(routerConstants.HOME_ROUTE);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "700px",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#faf9f7",
      }}
    >
      <h1>{localLanguage.EMPLOYEE_DETAILS}</h1>
      <Card
        title={empData[0]?.name}
        bordered={false}
        actions={[<Button onClick={handleLogOut}>{localLanguage.LOGOUT}</Button>]}
        style={{
          width: 300,
        }}
      >
        <p>{`${localLanguage.LOCATION} : ${empData[0]?.location}`}</p>
        <p>{`${localLanguage.EMAIL} : ${empData[0]?.email}`}</p>
        <p>{`${localLanguage.DEPARTMENT} : ${
          empData[0]?.dept.length ? empData[0]?.dept : localLanguage.NOT_HIRED
        }`}</p>
      </Card>
    </div>
  );
};

export default EmployeeDetails;
