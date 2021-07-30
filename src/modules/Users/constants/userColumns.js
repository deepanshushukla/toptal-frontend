import React from "react";
import { Tag } from "antd";
import { USER_ROLES } from "constants/userRoles";

export const USERS_COLUMN = [
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "firstName",
    render: (text, record) => (
      <p>
        {record.firstName} {record.lastName}
      </p>
    ),
  },
  {
    title: "Mobile",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Role",
    key: "role",
    dataIndex: "role",
    render: (role) => (
      <Tag color={USER_ROLES[role].color} key={role}>
        {USER_ROLES[role].display}
      </Tag>
    ),
  },
];
export const USERS_ACTION_COLUMN = {
  title: "Action",
  key: "action",
};
