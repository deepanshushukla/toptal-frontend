import React, { useCallback, useContext, useEffect, useState } from "react";
import {Table, Button, Space, Modal, message} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
//components
import UserDetail from "./UserDetail";
import LoadingSpinner from "../../components/LoadingSpinner";
import Header from "../../components/Header";
//services
import {
  getAllUsers,
  saveUser,
  updateUser,
  deleteUser,
} from "services/usersService";
//context
import UserContext from "../../context/userContext";
//constants
import { USERS_COLUMN, USERS_ACTION_COLUMN } from "./constants/userColumns";
import { ADMIN } from "../../constants/userRoles";
import { USER_DELETED_SUCCESS } from "../../constants/messages";

const { confirm } = Modal;
const Users = () => {
  const [usersData, setUsersData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [drawerVisible, setDrawerVisibility] = useState(false);
  const loggedInUser = useContext(UserContext);
  const fetchUserData = useCallback(async () => {
    setUsersData(null);
    setLoader(true);
    try {
      let usersData = await getAllUsers();
      setUsersData(usersData);
      setLoader(false);
    } catch (e) {
      setUsersData(null);
      setLoader(false);
    }
  }, []);
  useEffect(fetchUserData, [fetchUserData]);

  const remvoveUser = async (item) => {
    setLoader(true);
    try {
      const res = await deleteUser(item.id);
      message.success(res.message || USER_DELETED_SUCCESS );
      fetchUserData();
      setLoader(false);
    } catch (e) {
      setLoader(false);
    }
  };
  const onSubmitUser =  () => {
    fetchUserData();
    setDrawerVisibility(false);
  };
  const showDeleteConfirm = (record) => {
    confirm({
      title: "Do you Want to delete this user?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        remvoveUser(record);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const createUser = () => {
    setSelectedItem(null);
    setDrawerVisibility(true);
  };
  const editUser = (record) => {
    setSelectedItem(record);
    setDrawerVisibility(true);
  };
  USERS_ACTION_COLUMN.render = (text, record) => {
    return (
      <Space size="middle">
        <Button onClick={() => editUser(record)} type="link">
          Edit
        </Button>
        <Button onClick={() => showDeleteConfirm(record)} disabled={loggedInUser.id === record.id} type="link">
          Delete
        </Button>
      </Space>
    );
  };
  const columns =
    loggedInUser.role === ADMIN
      ? [...USERS_COLUMN, USERS_ACTION_COLUMN]
      : [...USERS_COLUMN];
  return (
    <div className="usersContainer">
      {loader && <LoadingSpinner />}
      <Header
        title="Users"
        right={
          loggedInUser.role === ADMIN ? (
            <Button key="1" type="primary" onClick={createUser}>
              Create User
            </Button>
          ) : null
        }
      />
      <UserDetail
        visible={drawerVisible}
        onSubmitUser={onSubmitUser}
        setDrawerVisibility={setDrawerVisibility}
        initialValue={selectedItem}
      />
      <Table columns={columns} dataSource={usersData} scroll={{ y: 480 }} />
    </div>
  );
};
export default Users;
