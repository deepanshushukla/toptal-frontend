import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router";

import {
    Redirect,
    useLocation,
} from 'react-router-dom'
import { Form, Input, Button ,Select } from 'antd';
import { userSignup} from '../../../services/authenticationService';
import { setAuthDetailsLS } from 'helpers/authHelper';

//style
import './index.scss';
import {mobileValidator} from "../../../helpers/mobileNoValidator";

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

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='loginContainer'>
            <Form
                name = "Sigup Form"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="FirstName"
                    name="firstName"
                    rules={[{ required: true,  message: 'Required Field!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="LastName"
                    name="lastName"
                    rules={[{ required: true,  message: 'Required Field!' }]}
                >
                    <Input />
                </Form.Item>
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

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};
export default Signup