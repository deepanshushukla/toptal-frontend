import React, {lazy, Suspense} from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import LoadingScreen from 'components/LoadingSpinner'
import ProtectedRoute from "components/ProtectedRoute";

import {
  DASHBOARD,
  USERS,
  NAVIGATION_PATH,
  AUTH,
} from "constants/navigationPath";

//stylesheets
import "antd/dist/antd.css";
import "./App.scss";

//components
const Authentication = lazy(() => import(/* webpackChunkName: 'Authentication' */ "modules/Authentication"));
const Dashboard = lazy(() => import(/* webpackChunkName: 'Dashboard' */ "modules/Dashboard"));
const Users = lazy(() => import(/* webpackChunkName: 'Users' */ "modules/Users"));

const App = () => {
  return (
      <Suspense fallback={<LoadingScreen />}>
        <Router>
          <Switch>
             <Route path={NAVIGATION_PATH[AUTH].path} component={Authentication} />
              <ProtectedRoute
                path={NAVIGATION_PATH[DASHBOARD].path}
                component={Dashboard}
              />
              <ProtectedRoute path={NAVIGATION_PATH[USERS].path} component={Users} />
              <Redirect to={NAVIGATION_PATH[DASHBOARD].path} />
          </Switch>
        </Router>
      </Suspense>
  );
};

export default App;
