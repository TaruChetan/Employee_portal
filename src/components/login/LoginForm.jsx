import React, { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/slices/slice";
import { localLanguage, routerConstants } from "../../utils/constants";

const LoginForm = ({ person }) => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [messageApi1, contextHolder1] = message.useMessage();
  const navigate = useNavigate();
  const data = useSelector((state) => state.mainReducer);

  const [isError, setError] = useState(false);

  const onFinish = (values) => {
    const { user, email, password } = values;
    const check = data?.user.find((res) => {
      return res.user == user && res.email == email && res.password == password;
    });
    if (check) {
      dispatch(userLogin(email));
      showStatus(localLanguage.SUCCESS,localLanguage.LOGGED_IN);
      setTimeout(() => {
        if (user ==localLanguage.EMPLOYEE ) navigate(routerConstants.EMP_LOGGEDIN_ROUTE);
        else if (user == localLanguage.MANAGER) navigate(routerConstants.MANAGER_LOGGEDIN_ROUTE);
      }, 2000);
    } else {
      showStatus(localLanguage.ERROR,localLanguage.LOGIN_FAILED);
    }
  };

  const showStatus = (type, msg) => {
    messageApi1.open(
      {
        type: type,
        content: msg,
      },
      1.5
    );
  };
  return (
    <>
      {contextHolder1}
      {contextHolder}
      <Card
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <div className="containerProducts">
          <h1 style={{ textAlign: "center" }} className="Products">
            {person}
          </h1>
          <h1 style={{ textAlign: "center" }} className="Products">
            Log
            <span style={{ color: "#f7444e" }}>In</span>
          </h1>
        </div>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name={localLanguage.USER}
            rules={[
              {
                required: true,
                message: localLanguage.USER_MSG,
              },
            ]}
          >
            <Select placeholder={localLanguage.SELECT_USER_TYPE}>
              <Option value="employee">{localLanguage.EMPLOYEE}</Option>
              <Option value="manager">{localLanguage.MANAGER}</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={localLanguage.EMAIL_S}
            rules={[
              {
                required: true,
                message: localLanguage.ENTER_EMAIL,
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder={localLanguage.EMAIL}
            />
          </Form.Item>
          <Form.Item
            name={localLanguage.PASSWORD}
            rules={[
              {
                required: true,
                message: localLanguage.ENTER_PASSWORD,
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type={localLanguage.PASSWORD}
              placeholder="Password"
            />
          </Form.Item>
          {isError ? <span style={{ color: "red" }}>{localLanguage.INVALID}</span> : ""}
          <Form.Item>
            <Button
              onClick={(e) => {
                e.stopPropagation();
              }}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
            >
              {localLanguage.LOGIN}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default LoginForm;
