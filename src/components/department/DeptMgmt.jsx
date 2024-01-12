import { Button, Modal, Form, Input } from "antd";
import React, { useState } from "react";
import DeptList from "./DeptList";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import EmpList from "../employee/EmpList";
import { useDispatch, useSelector } from "react-redux";
import { addDepartment, userLogout } from "../../store/slices/slice";
import { localLanguage, routerConstants } from "../../utils/constants";
const DeptMgmt = () => {
  const [err, setErr] = useState(false);
  const sliceData = useSelector((state) => state.mainReducer);
  const managerData = sliceData?.user.filter((item) => item.isLogin);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const openModel = () => {
    setShow(true);
  };
  const handleOk = () => {
    setShow(false);
  };
  const handleCancel = () => {
    setShow(false);
  };
  const onFinish = (values) => {
    const { deptName } = values;
    const found = sliceData?.department.find(
      (item) => item.deptName == deptName
    );
    if (!found) {
      setShow(false);
      const data = { ...values, numEmployees: 0 };
      setErr(false);
      dispatch(addDepartment(data));
    } else {
      setErr(true);
    }
  };
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(userLogout(managerData[0]?.email));
    navigate(routerConstants.HOME_ROUTE);
  };
  return (
    <div>
      <div
        className="MenuButtons"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Button onClick={openModel}>{localLanguage.CREATE_DEPT}</Button>
        <Button onClick={() => navigate(routerConstants.VIEW_DEPARTMENT_ROUTE)}>
          {localLanguage.VIEW_DEPT}
        </Button>
        <Button onClick={() => navigate(routerConstants.VIEW_EMPLOYEE_ROUTE)}>
          {localLanguage.VIEW_EMP}
        </Button>
        <Button onClick={handleLogOut}>{localLanguage.LOGOUT}</Button>
      </div>
      <div
        style={{
          height: "600px",
          width: "800px",
          margin: "auto",
          padding: "10px",
          marginTop: "30px",
          border: "solid black 2px",
          overflow: "auto    ",
        }}
      >
        <Routes>
          <Route
            path={routerConstants.HOME_ROUTE}
            element={
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h1>{`${localLanguage.NAME} : ${managerData[0]?.name}`}</h1>
                <h1>{`${localLanguage.LOCATION} : ${managerData[0]?.location}`}</h1>
                <h1>{`${localLanguage.EMAIL} : ${managerData[0]?.email}`}</h1>
              </div>
            }
          />
          <Route path={routerConstants.DEPT_LIST_ROUTE} element={<DeptList />} />
          <Route path={routerConstants.EMP_LIST_ROUTE} element={<EmpList />} />
        </Routes>
      </div>
      <Modal footer={[]} open={show} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <h2 style={{ textAlign: "center" }}>{localLanguage.ADD_DEPARTMENT}</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name={localLanguage.HOD_S}
              rules={[
                {
                  required: true,
                  message: localLanguage.MSG_DEPT,
                },
              ]}
            >
              <Input placeholder={localLanguage.HOD_PLACEHOLDER} />
            </Form.Item>
            <Form.Item
              name={localLanguage.LOCATION}
              rules={[
                {
                  required: true,
                  message: localLanguage.MSG_LOCATION_OF_HEAD,
                },
              ]}
            >
              <Input placeholder={localLanguage.LOCATION_OF_HEAD} />
            </Form.Item>
            <Form.Item
              name={localLanguage.DEPTNAME}
              rules={[
                {
                  required: true,
                  message: localLanguage.ENTER_NAME,
                },
              ]}
            >
              <Input placeholder={localLanguage.NAME} />
            </Form.Item>
            <Form.Item
              label={localLanguage.NO_OF_EMPLOYEES}
              name={localLanguage.NUMEMPLOYEES}
              rules={[
                {
                  message: "",
                },
              ]}
            >
              <Input count={true} placeholder="0" disabled />
            </Form.Item>
            <Form.Item>
              {err && (
                <div style={{ color: "red" }}>{localLanguage.DEPARTMENT_ALREADY_EXIST}</div>
              )}
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                {localLanguage.ADD}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default DeptMgmt;
