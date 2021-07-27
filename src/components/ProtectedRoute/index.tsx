import React, { FC } from "react";
import { Redirect, Route } from "react-router-dom";
import { RouteProps } from "react-router";
//component
import MainLayout from "components/Layout";
//helper
import { isUserAuthorized, getAuthDetailsFromLS } from "helpers/authHelper";
//context
import UserContext from "context/userContext";
const ProtectedRoute: FC<RouteProps> = ({ ...props }) => {
  const { isAuthenticated } = isUserAuthorized();
  return isAuthenticated ? (
    <UserContext.Provider value={getAuthDetailsFromLS()}>
      <MainLayout>
        <Route {...props} />
      </MainLayout>
    </UserContext.Provider>
  ) : (
    <Redirect to={{ pathname: "/auth", state: { from: props.location } }} />
  );
};
export default ProtectedRoute;
