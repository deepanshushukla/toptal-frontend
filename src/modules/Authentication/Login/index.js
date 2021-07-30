import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useHistory } from "react-router";

import { Form, Input, Button, Row, Col, Spin, Alert, message } from "antd";

import { loginUser } from "services/authenticationService";
import { setAuthDetailsLS } from "helpers/authHelper";

//constants
import {
  SOMETHING_WENT_WRONG,
  LOGIN_SUCCESS,
} from "../../../constants/messages";
//style
import "./index.scss";

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const { state } = useLocation();

  const onFinish = async (values) => {
    setLoading(true);
    setError('');
    try {
      const userData = await loginUser(values);
      setLoading(false);
      setAuthDetailsLS(userData);
      message.success(LOGIN_SUCCESS)
      history.push(state?.from || "/dashboard");
    } catch (e) {
      setLoading(false);
      setError(e.message || SOMETHING_WENT_WRONG);
    }
  };
  return (
    <div className="container">
      <div className="loginWrapper">
        <Spin tip={"Sigining"} spinning={isLoading}>
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
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input  valid email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              {error && (
                <Row className={"inlineFormItem"}>
                  <Col span={24}>
                    <Alert message={error} closable type="error" showIcon />
                  </Col>
                </Row>
              )}
              <Form.Item
                wrapperCol={{
                  span: 24,
                }}
              >
                <Button className="submitBtn" type="primary" htmlType="submit">
                  Sign In
                </Button>
                <Row className="linksWrapper">
                  <Col>
                    <Link to="/auth/forgotPassword">
                      <Button className="commonLoginLink" type="link">
                        Forgot password?
                      </Button>
                    </Link>
                  </Col>
                  <Col>
                    <Link to="/auth/signup">
                      <Button className="commonLoginLink" type="link">
                        Don't have an account? Sign up.
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </div>
        </Spin>
      </div>
    </div>
  );
};
export default Login;
