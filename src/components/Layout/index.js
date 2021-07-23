import React, {useContext, useEffect} from 'react';
import { Layout } from 'antd';
import Navigation from  '../Navigation';
import Logout from 'modules/Authentication/Logout'
import './index.scss'
import { useLocation } from "react-router-dom";
import UserContext from "../../context/userContext";
import {INAPP_NAVIGATION_ITEMS}  from 'constants/navigation'
import  filterNavItemBasedOnRoles from 'utils/filterNavItemBasedOnRoles';
import {useHistory} from "react-router";
const {Content, Header } = Layout;

const MainLayout = ({children}) => {
    const location = useLocation();
    const history = useHistory();
    const userDetails= useContext(UserContext);
    useEffect(() => {
        let filteredNavigation  = INAPP_NAVIGATION_ITEMS.filter((item) => filterNavItemBasedOnRoles(item, userDetails))
        filteredNavigation = filteredNavigation.filter((item)=>item.path.startsWith(location.pathname));
         !filteredNavigation.length && history.push('/dashboard');
    }, [location]);

        return (
            <Layout className='mainLayout'>
                <Navigation />
                <Layout className="mainLayout__content">
                    <Header>
                        <Logout />
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            heigth: '100vh',
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        );
};

export default MainLayout;
