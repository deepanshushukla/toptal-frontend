import React, { useEffect, useState } from "react";
import {Drawer, Form, Button, Col, Row, Input, Select, Spin, InputNumber, message, Alert} from "antd";
//helpers
import { mobileValidator } from "helpers/mobileNoValidator";
import { allowOnlyNumber } from "helpers/allowOnlyNumber";
//services
import {
  saveUser,
  updateUser,
} from "services/usersService";
//constants
import { USER_ROLES } from "constants/userRoles";
import {SOMETHING_WENT_WRONG, USER_SAVED_SUCCESS} from "constants/messages";

const { Option } = Select;

const UserDetail = ({
  visible,
  initialValue,
  setDrawerVisibility,
  onSubmitUser,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!visible) {
      setLoading(false);
    }
  }, [visible]);
  useEffect(() => {
    if (initialValue && visible) {
      form.setFieldsValue(initialValue);
    } else {
      form.resetFields();
    }
  }, [initialValue, visible]);

  const onClose = () => {
    setDrawerVisibility(false);
  };

  const onFinish = async (values) => {
    setLoading(true);
    setError('');
    const { id } = initialValue || {};
    const payload = { ...values, id };
    try {
      if(payload.id){
        await updateUser( payload.id, payload)
      }else{
        await saveUser( payload);
      }
      setLoading(false);
      onSubmitUser();
      message.success(USER_SAVED_SUCCESS);
      onSubmitUser()
    } catch (e) {
      setLoading(false);
      setError(e.message || SOMETHING_WENT_WRONG);
    }
  };
  return (
      <Drawer
        title="Create New user"
        width={520}
        onClose={onClose}
        visible={visible}
        mask={true}
        maskClosable={false}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={() => form.submit()} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <Spin spinning={isLoading}>

        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          {error && (
              <Row gutter={16} style={{marginBottom:'8px'}}>
                <Col span={24}>
                  <Alert message={error} closable type="error" showIcon />
                </Col>
              </Row>
          )}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: "First name required" }]}
              >
                <Input placeholder="First name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: "Last name required" }]}
              >
                <Input placeholder="Last name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Phone Number"
                onKeyPress={allowOnlyNumber}
                name="phoneNumber"
                placeholder="Phone Number"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Phone number!',
                  },
                  {
                    validator: mobileValidator,
                  },
                ]}
              >
                <InputNumber placeholder="Phone Number" style={{width:'100%'}}/>
              </Form.Item>
            </Col>
            <Col span={12}>
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
                <Input  placeholder="Enter Email"/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: "Please choose Role" }]}
              >
                <Select placeholder="Please choose Role">
                  {Object.keys(USER_ROLES).map((role) => (
                    <Option key={role} value={role}>
                      {USER_ROLES[role].display}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        </Spin>
      </Drawer>
  );
};
export default UserDetail;
