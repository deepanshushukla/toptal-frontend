import React, {useState, useEffect, useContext} from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import {Layout, Menu} from 'antd';
import Icon  from '@ant-design/icons';

import { INAPP_NAVIGATION_ITEMS } from "constants/navigation";
import UserContext from "../../context/userContext";
//utils
import filterNavItemBasedOnRoles from 'utils/filterNavItemBasedOnRoles';
import './index.scss'
const { Sider } = Layout;


const Navigation = () => {
    const [collapsed, setCollapsed] = useState(true)
    const location = useLocation();
    const history = useHistory();
    const userDetails= useContext(UserContext);
    const [selectedKey, setSelectedKey] = useState(INAPP_NAVIGATION_ITEMS.find(_item => location.pathname.startsWith(_item.path)).key);
    useEffect(() => {
        setSelectedKey(INAPP_NAVIGATION_ITEMS.find(_item => location.pathname.startsWith(_item.path)).key)
    }, [location]);

    const toggle = () => {
        setCollapsed(!collapsed);
    };
    const onClickMenu = (item) => {
        const clicked = INAPP_NAVIGATION_ITEMS.find(_item => _item.key === item.key);
        history.push(clicked.path)
    };


    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="mainLayout__logo" >
                <span>Toptal</span>
            </div>

            <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]} onClick={onClickMenu}>
                {INAPP_NAVIGATION_ITEMS.filter((item)=>filterNavItemBasedOnRoles(item,userDetails)).map((item) => (
                    <Menu.Item key={item.key} icon={<Icon component={item.icon} />}>{item.label}</Menu.Item>
                ))}
            </Menu>
          </Sider>

    )
}

export default Navigation