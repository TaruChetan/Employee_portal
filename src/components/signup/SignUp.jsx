import React from "react";
import {
  LockOutlined,
  MailOutlined,
  ContactsOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Button, Card, Form, Input, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userSignUp } from "../../store/slices/slice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.mainReducer);
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = (values) => {
    const { email } = values;
    const check = data?.user.find((res) => {
      return res.email == email;
    });
    if (!check) {
      dispatch(userSignUp(values));
      showStatus("success", "Registration successful");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else if (check) {
      showStatus("error", "User already registered");
    }
  };
  const showStatus = (type, content) => {
    messageApi.open(
      {
        type: type,
        content: content,
      },
      1.5
    );
  };
  return (
    <>
      <Card
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        {contextHolder}
        <div className="containerProducts">
          <h1 style={{ textAlign: "center " }} className="Products">
            Sign
            <span style={{ color: "#f7444e" }}>Up</span>
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
            name="user"
            rules={[
              {
                required: true,
                message: "Please select User type!",
              },
            ]}
          >
            <Select placeholder="select user type">
              <Option value="employee">Employee</Option>
              <Option value="manager">Manager</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Enter name",
              },
            ]}
          >
            <Input
              prefix={<ContactsOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Enter Email",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="location"
            rules={[
              {
                required: true,
                message: "Enter location",
              },
            ]}
          >
            <Input
              prefix={<ThunderboltOutlined className="site-form-item-icon" />}
              placeholder="Location"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Enter Password",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
            >
              SignUp
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default SignUp;
