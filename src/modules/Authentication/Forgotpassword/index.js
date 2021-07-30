import { Form, Input, Button, message, Spin, Row, Col, Alert } from "antd";
import React, { useState } from "react";
import { forgotPassword } from "../../../services/authenticationService";
import {
  SOMETHING_WENT_WRONG,
  TOKEN_SENT_SUCCESSFULLY,
} from "../../../constants/messages";
import "./index.scss";

const Forgotpassword = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const onFinish = async (values) => {
    setLoading(true);
    setError('');
    try {
      const res = await forgotPassword(values);
      setLoading(false);
      message.success(res.message || TOKEN_SENT_SUCCESSFULLY, 2);
    } catch (e) {
      setLoading(false);
      setError(e.message || SOMETHING_WENT_WRONG);
    }
  };
  return (
    <div className="container">
      <div className="loginWrapper">
        <Spin tip={"Generating token"} spinning={isLoading}>
          <div className="loginFormContainer">
            <h1 className="loginHeading">Forgot Password</h1>
            <Form
              name="forgotPassword"
              className="loginForm"
              labelAlign="left"
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input  valid email!",
                  },
                ]}
              >
                <Input placeholder="Enter your email" />
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
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Spin>
      </div>
    </div>
  );
};
export default Forgotpassword;
