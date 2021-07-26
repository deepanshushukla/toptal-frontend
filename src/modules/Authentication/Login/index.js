import React from 'react'
import {
    useLocation,
    Link
} from 'react-router-dom'
import { useHistory } from "react-router";

import { Form, Input, Button ,Row , Col } from 'antd';

import { loginUser } from 'services/authenticationService';
import { setAuthDetailsLS } from 'helpers/authHelper';

//style
import './index.scss';


const  Login= () => {
    const history = useHistory();
    const { state } = useLocation();

    const onFinish = async (values) => {
        try {
            const userData = await loginUser(values);
            setAuthDetailsLS(userData);
            history.push(state?.from || '/dashboard')
        }
        catch(e){
            console.log(e)
        }
    };
        return (
            <div className='container'>
                <div className="loginWrapper">
                <div className="loginFormContainer">
                    <h1 className="loginHeading">Login</h1>
                    <Form
                        name="login"
                        className="loginForm"
                        labelAlign="left"
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, type: "email", message: 'Please input  valid email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                span: 24
                            }}
                        >
                            <Button className="submitBtn" type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Row className="linksWrapper">
                                <Col>
                                    <Link to="/auth/forgotPassword" >
                                        <Button className="commonLoginLink" type="link">Forgot password?</Button>
                                    </Link>
                                </Col>
                                <Col>
                                    <Link to="/auth/signup" >
                                        <Button className="commonLoginLink" type="link">Don't have an account? Sign up.
                                        </Button>
                                    </Link>
                                    </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </div>
                </div>
            </div>
        );
};
export default Login