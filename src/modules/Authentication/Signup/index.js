import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router";

import {Form, Input, Button, Select, Row, Col} from 'antd';
import { userSignup} from '../../../services/authenticationService';
import {mobileValidator} from "../../../helpers/mobileNoValidator";

//style
import './index.scss';
import {Link} from "react-router-dom";

const { Option } = Select;

const  Signup= () => {
const history = useHistory();
    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            const userData = await userSignup(values);
            history.push('/dashboard')
        }
        catch(e){
            console.log(e)
        }
    };

    return (
        <div className='container'>
            <div className="loginWrapper">
                <div className="loginFormContainer">
                    <h1 className="loginHeading">Signup</h1>
                    <Form
                        name="signup"
                        className="loginForm"
                        labelAlign="left"
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Row className={'inlineFormItem'}>
                            <Col span={10}> <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[{ required: true,  message: 'Required Field!' }]}
                            >
                                <Input />
                            </Form.Item></Col>
                            <Col span={10}>
                                <Form.Item
                                    label="Last Name"
                                    name="lastName"
                                    rules={[{ required: true,  message: 'Required Field!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            label="Phone Number"
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            name="phoneNumber"
                            rules={[
                                {
                                    validator: mobileValidator,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
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

                        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                            <Select
                                placeholder="Select Role"
                                allowClear
                            >
                                <Option value="client">Client</Option>
                                <Option value="realtor">Realtor</Option>
                            </Select>
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
                                        <Button className="commonLoginLink" type="link">Forgot your password?
                                        </Button>
                                    </Link>
                                </Col>
                                <Col>
                                    <Link to="/auth/signin" >
                                        <Button className="commonLoginLink" type="link">Already have an account? Sign in
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
};
export default Signup