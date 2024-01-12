import { Form, Button, Input, List, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDepartment, updateDepartment } from "../../store/slices/slice";
import { localLanguage } from "../../utils/constants";

const DeptList = () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);
  const [departmentNames, setDepartmentNames] = useState();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.mainReducer);
  const handleDelete = (name) => {
    dispatch(deleteDepartment(name));
  };

  const openModel = (item) => {
    setData(item);
    form.setFieldsValue(item);
    setShow(true);
  };
  const handleOk = () => {
    setShow(false);
    setShow1(false);
  };
  const handleCancel = () => {
    setShow(false);
    setShow1(false);
  };
  const onFinish = (values) => {
    setShow(false);
    dispatch(updateDepartment(values));
  };
  const viewDept = (item) => {
    setData1(item);
    setShow1(true);
  };

  useEffect(() => {
    const deptEmpData = list?.user.filter(
      (item) => item.dept == data1?.deptName
    );
    const deptEmpNames = deptEmpData?.map((item) => item.name);
    setDepartmentNames(deptEmpNames);
  }, [data1]);

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={list?.department}
        renderItem={(item, index) => (
          <List.Item
            key={index}
            actions={[
              <a onClick={() => viewDept(item)} style={{ margin: "20px" }}>
                {localLanguage.VIEW}
              </a>,
              <a onClick={() => openModel(item)} style={{ margin: "20px" }}>
                {localLanguage.UPDATE}
              </a>,
              <a
                onClick={() => handleDelete(item.deptName)}
                style={{ margin: "20px" }}
              >
                {localLanguage.DELETE}
              </a>,
            ]}
          >
            <List.Item.Meta
              title={<h2>{item.deptName}</h2>}
              description={
                <div>{`${localLanguage.TOTAL_EMPLOYEES}: ${item.numEmployees}`}</div>
              }
            />
          </List.Item>
        )}
      />
      <Modal footer={[]} open={show1} onOk={handleOk} onCancel={handleCancel}>
        <div style={{ textAlign: "center" }}>
          <h1>{`${localLanguage.DEPT_NAME}: ${data1?.deptName}`}</h1>
          <h1>{`${localLanguage.HOD} : ${data1?.hod}`}</h1>
          <h1>{`${localLanguage.LOCATION} : ${data1?.location}`}</h1>
          <h1 style={{ textAlign: "center" }}>{localLanguage.EMPLOYEES}</h1>
          <div
      id="scrollableDiv"
      style={{
        height: 120,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
     
        <List
          dataSource={departmentNames}
          renderItem={(item) => (
            <List.Item key={item}>
              <List.Item.Meta
                
                title={item}
                
              />
              
            </List.Item>
          )}
        />
    </div>
        </div>
      </Modal>
      <Modal footer={[]} open={show} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <h2 style={{ textAlign: "center" }}>
            {localLanguage.UPDATE_DEPARTMENT}
          </h2>
          <Form
            name="normal_login"
            form={form}
            className="login-form"
            initialValues={{
              hod: data?.hod,
              location: data?.location,
              deptName: data?.deptName,
              numEmployees: data?.numEmployees,
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
                  message:localLanguage.MSG_LOCATION_OF_HEAD,
                },
              ]}
            >
              <Input placeholder={localLanguage.LOCATION_OF_HEAD} />
            </Form.Item>
            <Form.Item
              label={localLanguage.DEPT_NAME}
              name={localLanguage.DEPTNAME}
              rules={[
                {
                  message: "",
                },
              ]}
            >
              <Input placeholder={localLanguage.NAME} readOnly />
            </Form.Item>
            <Form.Item label={localLanguage.NO_OF_EMPLOYEES} name={localLanguage.NUMEMPLOYEES}>
              <Input count={true} placeholder="0" readOnly />
            </Form.Item>
            <Form.Item>
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                {localLanguage.UPDATE}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default DeptList;
