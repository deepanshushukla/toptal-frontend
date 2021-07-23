import { useHistory } from "react-router";
import {
    PoweroffOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';

import {Button, Modal} from 'antd';

import { removeAuthDetailsFromLS } from 'helpers/authHelper';
import React from "react";

const { confirm } = Modal;


const  Logout= () => {

    const history = useHistory();

    const showLogoutConfirm = () => {
        confirm({
            title: 'Do you want to Logout?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                logout ()
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const logout = () =>{
        removeAuthDetailsFromLS();
        history.push('/auth');
    };

    return (
             <Button
         type="primary"
         icon={<PoweroffOutlined />}
         onClick={showLogoutConfirm}
     />

    )
};
export default Logout