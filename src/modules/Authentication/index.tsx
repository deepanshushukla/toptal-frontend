import React from 'react';
import {useRouteMatch, Switch, Route, Redirect} from 'react-router-dom'
import Login from './Login/index';
import Signup from './Signup/index';
//styles
import './index.scss';



const Authentication = () => {
    const {path} = useRouteMatch();

    return (
        <div className='authContainer'>
            <Switch>
                <Route exact path={`${path}/login`}>
                    <Login />
                </Route>
                <Route path={`${path}/signup`}>
                    <Signup/>
                </Route>
                <Redirect to={`${path}/login`} />
            </Switch>
        </div>
    )
};
export default Authentication;