import { List, Modal, Dropdown, Space, Button, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignDepartment } from "../../store/slices/slice";
import { localLanguage } from "../../utils/constants";

const EmpList = () => {
  const [filterData, setFilterData] = useState([]);
  const [empData, setEmpData] = useState();
  const [empDept, setEmpDept] = useState();
  const [empKey, setEmpKey] = useState();
  const list = useSelector((state) => state.mainReducer);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const dispatch = useDispatch();
  const openModel = (item) => {
    setShow(true);
    setEmpData(item);
  };
  const handleOk = () => {
    setShow(false);
    setShow1(false);
  };
  const handleCancel = () => {
    setShow(false);
    setShow1(false);
  };
  const showModel = (data) => {
    setShow1(true);
    setEmpDept(data);
  };
  const handleAssign = () => {
    const data = { ...empDept, dept: empKey };
    dispatch(assignDepartment(data));
    setShow1(false);
  };
  useEffect(() => {
    const data = list?.user
      .filter((item) => item.user == "employee")
      .map(({ user, password, ...restData }) => restData);

    setFilterData(data);
  }, [list?.user]);
  const menuItems = list?.department.map((item) => (
    <Menu.Item key={item.deptName}>{item.deptName}</Menu.Item>
  ));
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={filterData}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <a onClick={() => openModel(item)} style={{ margin: "20px" }}>
                {localLanguage.VIEW}
              </a>,
              <a
                disabled={item.dept ? true : false}
                onClick={() => showModel(item)}
                style={{ margin: "20px" }}
              >
                {localLanguage.ASSIGN_DEPT}
              </a>,
            ]}
          >
            <List.Item.Meta title={<h2>{item.name}</h2>} />
          </List.Item>
        )}
      />
      <Modal footer={[]} open={show} onOk={handleOk} onCancel={handleCancel}>
        <div style={{ textAlign: "center" }}>
          <h1>{`${localLanguage.NAME} : ${empData?.name}`}</h1>
          <h1>{`${localLanguage.EMAIL} : ${empData?.email}`}</h1>
          <h1>{`${localLanguage.LOCATION} : ${empData?.location}`}</h1>
          {empData?.dept.length ? (
            <h1>{`Dept : ${empData?.dept}`}</h1>
          ) : (
            localLanguage.NOT_HIRED
          )}
        </div>
      </Modal>
      <Modal footer={[]} open={show1} onOk={handleOk} onCancel={handleCancel}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <h3>{`${empDept?.name}`}</h3>
          <span>
            <Space direction="vertical">
              <Space wrap>
                <Dropdown
                  trigger={["click"]}
                  overlay={
                    <Menu>
                      {menuItems.map((item) => (
                        <Menu.Item
                          key={item.key}
                          onClick={() => setEmpKey(item.key)}
                        >
                          {item}
                        </Menu.Item>
                      ))}
                    </Menu>
                  }
                  placement="bottom"
                >
                  <Button type="link">{localLanguage.SELECT_DEPT}</Button>
                </Dropdown>
                <Button onClick={handleAssign}>{localLanguage.ASSIGN}</Button>
              </Space>
            </Space>
          </span>
        </div>
      </Modal>
    </>
  );
};

export default EmpList;
