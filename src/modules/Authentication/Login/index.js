import { useState, useEffect } from 'react'
import {
    useLocation,
} from 'react-router-dom'
import { useHistory } from "react-router";

import { Form, Input, Button  } from 'antd';

import { loginUser } from 'services/authenticationService';
import { setAuthDetailsLS } from 'helpers/authHelper';

//style
import './index.scss';


const  Login= () => {
    const [
        redirectToReferrer,
        setRedirectToReferrer
    ] = useState(false);
    const history = useHistory();
    const { state } = useLocation();

    useEffect(() => {
        if (redirectToReferrer === true) {
            history.push(state?.from || '/dashboard')
        }
    },[redirectToReferrer]);

    const onFinish = async (values) => {
        try {
            const userData = await loginUser(values);
            setAuthDetailsLS(userData);
            setRedirectToReferrer(true);
        }
        catch(e){
            console.log(e)
        }
    };
    const gotoSignUp = () =>{
        history.push(state?.from || '/auth/signup')
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);

    };
    return (
        <div className='loginContainer'>
            <Form
                name = "Login Form"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className='loginForm'
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, type: "email", message: 'Please input not valid email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button type="link" htmlType="button" onClick={gotoSignUp}>
                        Dont hane an account yet?Signup
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};
export default Login