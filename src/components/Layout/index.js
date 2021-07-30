import React, { useContext, useEffect } from "react";
import PropTypes from 'prop-types'
import { useLocation } from "react-router-dom";
import { Layout } from "antd";
import { useHistory } from "react-router";

import Navigation from "../Navigation";
import Logout from "modules/Authentication/Logout";
import UserContext from "../../context/userContext";
import filterNavItemBasedOnRoles from "utils/filterNavItemBasedOnRoles";
import { INAPP_NAVIGATION_ITEMS } from "constants/navigation";

import "./index.scss";

const { Content, Header } = Layout;

const MainLayout = ({ children }) => {
  const location = useLocation();
  const history = useHistory();
  const userDetails = useContext(UserContext);
  useEffect(() => {
    let filteredNavigation = INAPP_NAVIGATION_ITEMS.filter((item) =>
      filterNavItemBasedOnRoles(item, userDetails)
    );
    filteredNavigation = filteredNavigation.filter((item) =>
      item.path.startsWith(location.pathname)
    );
    !filteredNavigation.length && history.push("/dashboard");
  }, [location]);

  return (
    <Layout className="mainLayout">
      <Navigation />
      <Layout className="mainLayout__content">
        <Header>
          <Logout />
        </Header>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            heigth: "100vh",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.element
}