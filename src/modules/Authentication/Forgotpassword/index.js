import {Form, Input, Button} from 'antd';
import React from "react";
import {forgotPassword} from '../../../services/authenticationService'
import './index.scss';

const Forgotpassword = () => {

    const onFinish = async (values) => {
        try {
            const res= await forgotPassword(values);
        }catch(e){
            console.log(e)
        }
    };
        return (
            <div className='container'>
                <div className="loginWrapper">
                    <div className="loginFormContainer">
                        <h1 className="loginHeading">Forgot Password</h1>
                        <Form
                            name="forgotPassword"
                            className="loginForm"
                            labelAlign="left"
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item name="email" label="Email"
                                       rules={[{ required: true, type: "email", message: 'Please input  valid email!' }]}
                            >
                                <Input placeholder='Enter your email'/>
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    span: 24
                                }}
                            >
                                <Button className="submitBtn" type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
export default Forgotpassword
