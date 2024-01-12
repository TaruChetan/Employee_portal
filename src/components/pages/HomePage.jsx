import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDepartment, userSignUp } from "../../store/slices/slice";
import { localLanguage, routerConstants } from "../../utils/constants";
const HomePage = () => {
  const sliceData = useSelector((state) => state.mainReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState("");

  const handleOptionChange = (value) => {
    setFormStatus(value);
  };

  useEffect(() => {
    {
      formStatus == localLanguage.LOGIN
        ? navigate(routerConstants.LOGIN_ROUTE)
        : formStatus == localLanguage.SIGNUP && navigate(routerConstants.SIGNUP_ROUTE);
    }
  }, [formStatus]);

  useEffect(() => {
    if (sliceData?.department.length == 0 && sliceData?.user.length == 0) {
      putData(defaultData);
      putDeptData(defaultDeptData);
    }
  }, []);

  const defaultData = [
    {
      user: "employee",
      name: "John Doe",
      location: "New York",
      email: "john.doe@example.com",
      password: "employee123",
      isLogin: false,
    },
    {
      user: "manager",
      name: "Jane Smith",
      location: "Los Angeles",
      email: "jane.smith@example.com",
      password: "manager123",
      isLogin: false,
    },
    {
      user: "employee",
      name: "Alice Johnson",
      location: "Chicago",
      email: "alice.johnson@example.com",
      password: "employee456",
      isLogin: false,
    },
    {
      user: "manager",
      name: "Bob Davis",
      location: "Houston",
      email: "bob.davis@example.com",
      password: "manager456",
      isLogin: false,
    },
    {
      user: "employee",
      name: "Eva Wilson",
      location: "Phoenix",
      email: "eva.wilson@example.com",
      password: "employee789",
      isLogin: false,
    },
    {
      user: "manager",
      name: "Chris White",
      location: "Philadelphia",
      email: "chris.white@example.com",
      password: "manager789",
      isLogin: false,
    },
    {
      user: "employee",
      name: "Grace Miller",
      location: "San Antonio",
      email: "grace.miller@example.com",
      password: "employeeABC",
      isLogin: false,
    },
    {
      user: "manager",
      name: "David Taylor",
      location: "San Diego",
      email: "david.taylor@example.com",
      password: "managerABC",
      isLogin: false,
    },
    {
      user: "employee",
      name: "Sophia Brown",
      location: "Dallas",
      email: "sophia.brown@example.com",
      password: "employeeXYZ",
      isLogin: false,
    },
    {
      user: "manager",
      name: "Michael Wilson",
      location: "San Jose",
      email: "michael.wilson@example.com",
      password: "managerXYZ",
      isLogin: false,
    },
  ];
  const defaultDeptData = [
    { deptName: "HR", hod: "John Doe", location: "New York", numEmployees: 0 },
    {
      deptName: "IT",
      hod: "Jane Smith",
      location: "Los Angeles",
      numEmployees: 0,
    },
    {
      deptName: "Marketing",
      hod: "Alice Johnson",
      location: "Chicago",
      numEmployees: 0,
    },
    {
      deptName: "Finance",
      hod: "Bob Davis",
      location: "Houston",
      numEmployees: 0,
    },
    {
      deptName: "Operations",
      hod: "Eva Wilson",
      location: "Phoenix",
      numEmployees: 0,
    },
    {
      deptName: "Sales",
      hod: "Chris White",
      location: "Philadelphia",
      numEmployees: 0,
    },
    {
      deptName: "Research and Development",
      hod: "Grace Miller",
      location: "San Antonio",
      numEmployees: 0,
    },
    {
      deptName: "Customer Support",
      hod: "David Taylor",
      location: "San Diego",
      numEmployees: 0,
    },
    {
      deptName: "Legal",
      hod: "Sophia Brown",
      location: "Dallas",
      numEmployees: 0,
    },
    {
      deptName: "Product Management",
      hod: "Michael Wilson",
      location: "San Jose",
      numEmployees: 0,
    },
  ];

  const putData = (data) => {
    data?.map((item) => dispatch(userSignUp(item)));
  };
  const putDeptData = (data) => {
    data?.map((item) => dispatch(addDepartment(item)));
  };

  return (
    <div
      className="MainDiv"
      style={{
        backgroundColor: "#F3E4CE",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div style={{ padding: "50px", fontSize: "40px" }}>
        {localLanguage.ORGANISATION_PORTAL}
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ padding: "10px" }}>
          <Button
            value={localLanguage.LOGIN_S}
            onClick={() => handleOptionChange("Login")}
            style={{ backgroundColor: "#83042D", color: "#FFFFFF" }}
          >
            {localLanguage.LOG_IN}
          </Button>
        </div>
        <div style={{ padding: "10px" }}>
          <Button
            value={localLanguage.SIGNUP_S}
            onClick={() => handleOptionChange("Signup")}
            style={{ backgroundColor: "#83042D", color: "#FFFFFF" }}
          >
            {localLanguage.SIGN_UP}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
