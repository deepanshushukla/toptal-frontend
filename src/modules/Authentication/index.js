import React from "react";
import { useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Forgotpassword from "./Forgotpassword";
import Resetpassword from "./Resetpassword";
//styles
import "./index.scss";

const Authentication = () => {
  const { path } = useRouteMatch();

  return (
    <div className="authContainer">
      <Switch>
        <Route exact path={`${path}/login`}>
          <Login />
        </Route>
        <Route path={`${path}/signup`}>
          <Signup />
        </Route>
        <Route exact path={`${path}/resetPassword/:token`}>
          <Resetpassword />
        </Route>
        <Route path={`${path}/forgotPassword/`}>
          <Forgotpassword />
        </Route>
        <Redirect to={`${path}/login`} />
      </Switch>
    </div>
  );
};
export default Authentication;
