import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import { DASHBOARD,USERS, NAVIGATION_PATH, AUTH } from 'constants/navigationPath';

//stylesheets
import 'antd/dist/antd.css';
import './App.scss';

//components
import Authentication from 'modules/Authentication/index';
import Dashboard from 'modules/Dashboard/index';
import Users from 'modules/Users';
import ProtectedRoute from 'components/ProtectedRoute';

const App = () => {
    return (
      <Router>

          <Switch>
              <Route path={NAVIGATION_PATH[AUTH].path} component={Authentication}/>
              <ProtectedRoute path={NAVIGATION_PATH[DASHBOARD].path} component={Dashboard}/>
              <ProtectedRoute path={NAVIGATION_PATH[USERS].path} component={Users}/>
              <Redirect to={NAVIGATION_PATH[DASHBOARD].path} />
          </Switch>
      </Router>
  );
}

export default App;
