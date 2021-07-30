import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin, Row, Col, Alert } from "antd";
import { useParams } from "react-router-dom";
import { resetPassword } from "../../../services/authenticationService";
import {
  SOMETHING_WENT_WRONG,
  PASSWORD_CHNAGED_SUCCESSFULLY,
  TOKEN_NOT_PRESENT,
} from "../../../constants/messages";
import { useHistory } from "react-router";
const Resetpassword = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const { token } = useParams();
  useEffect(() => {
    if (!token) {
      message.error(TOKEN_NOT_PRESENT, 2);
    }
  }, [token]);
  const onFinish = async (values) => {
    if (!token) {
      message.error(TOKEN_NOT_PRESENT, 2);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await resetPassword({ ...values, token });
      setLoading(false);
      message
        .success(res.message || PASSWORD_CHNAGED_SUCCESSFULLY, 2)
        .then(() => {
          history.push("/auth/login");
        });
    } catch (e) {
      setLoading(false);
      setError(e.message || SOMETHING_WENT_WRONG);
    }
  };

  return (
    <div className="container">
      <div className="loginWrapper">
        <Spin tip={"Resetting Password"} spinning={isLoading}>
          <div className="loginFormContainer">
            <h1 className="loginHeading">Reset Password</h1>
            <Form
              name="forgotPassword"
              className="loginForm"
              labelAlign="left"
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                name="password"
                label="New Password"
                rules={[{ required: true, message: "Please enter passwrod" }]}
              >
                <Input.Password placeholder="Enter your password" />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "The two passwords that you entered do not match!"
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
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
export default Resetpassword;
