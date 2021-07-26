import { Form, Input, Button  } from 'antd';
import {useParams} from 'react-router-dom';
import {resetPassword} from '../../../services/authenticationService'
import React, {useEffect} from "react";
const Resetpassword = () => {
    const { token } = useParams();
    useEffect(() => {
        if(!token){
            alert('Token is not present in the url')
        }
    },[token]);
    const onFinish = async (values) => {
        try {
            const res= await resetPassword({...values,token});
            console.log(res)
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
                        <Form.Item name="password" label="New Password"
                                   rules={[{ required: true,  message: 'Please enter passwrod' }]}
                        >
                            <Input.Password placeholder='Enter your password'/>
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder='Confirm Password' />
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
export default Resetpassword
