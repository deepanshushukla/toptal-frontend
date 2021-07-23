import React, {useCallback, useEffect, useState} from "react";
import {Table, PageHeader, Button, Space, Popconfirm, Modal} from 'antd';
import  {
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import UserDetail from './UserDetail'
import LoadingSpinner from '../../components/LoadingSpinner'
import { USERS_COLUMN, USERS_ACTION_COLUMN } from './constants/userColumns'
import { getAllUsers, saveUser, updateUser, deleteUser } from 'services/usersService'


const { confirm } = Modal;
const Users = () => {
    const [usersData,setUsersData] = useState(null)
    const [loader, setLoader] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [drawerVisible, setDrawerVisibility] = useState(false);
    const fetchUserData = useCallback(async () => {
        setUsersData(null);
        setLoader(true);
        try {
            let usersData = await getAllUsers();
            setUsersData(usersData);
            setLoader(false)

        }catch(e){
            setUsersData(null);
            setLoader(false);
        }
    },[]);
    useEffect(fetchUserData,[fetchUserData]);

    const remvoveUser = async (item) => {
        setLoader(true);
        try {
            await deleteUser(item.id);
            fetchUserData();
            setLoader(false);
        } catch(e) {
            setLoader(false);
        }
    };
    const onSubmitUser = async (payload) => {
        const fetchMethod = payload.id ?  updateUser.bind(null,payload.id, payload) : saveUser.bind(null,payload);
        try{
            await fetchMethod();
            fetchUserData();
            setDrawerVisibility(false);
        } catch(e) {
            console.log(e);
        }
    };
    const showDeleteConfirm = (record) => {
        confirm({
            title: 'Do you Want to delete this user?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                remvoveUser(record)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const createUser = ()=>{
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
                <a onClick={()=>editUser(record)}>Edit</a>
                <a onClick={()=>showDeleteConfirm(record)}>
                        Delete
                    </a>
            </Space> )
    };

    return (

        <div className='usersContainer'>
            {loader && <LoadingSpinner/>}
            <PageHeader
                ghost={false}
                title="Users"
                extra={[
                    <Button key="1" type="primary" onClick={createUser}>
                        Create User
                    </Button>
                ]}
            />
            <UserDetail visible={drawerVisible} onSubmitUser={onSubmitUser} setDrawerVisibility={setDrawerVisibility} initialValue={selectedItem}/>
            <Table columns={[...USERS_COLUMN,USERS_ACTION_COLUMN]} dataSource={usersData} scroll={{ y:480 }}/>
       </div>
    );
};
export default Users