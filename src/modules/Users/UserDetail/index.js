import React, {useEffect, useState} from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, Spin } from 'antd';
import { USER_ROLES } from 'constants/userRoles'
import { mobileValidator } from '../../../helpers/mobileNoValidator'
const { Option } = Select;

const UserDetail = ({visible, initialValue, setDrawerVisibility,onSubmitUser}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        if(!visible){
            setLoading(false)}
    },[visible]);
    useEffect(()=>{
        if(initialValue && visible) {
            form.setFieldsValue(initialValue);
        }else {
            form.resetFields();
        }
    },[initialValue, visible]);

    const onClose = () => {
        setDrawerVisibility(false);
    };

    const onFinish = (values) =>{
        const { id } = initialValue || {};
        setLoading(true)
        onSubmitUser({...values, id});
    };
    const onFinishFailed = () => {
    };
    return (
        <Spin spinning={false}>
        <Drawer
            title="Create New user"
            width={520}
            onClose={onClose}
            visible={visible}
            mask = {false}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button onClick={() =>form.submit()} type="primary">
                        Submit
                    </Button>
                </div>
            }
        >
            <Form layout="vertical" hideRequiredMark
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="firstName"
                            label="First Name"
                            rules={[{ required: true, message: 'First name required' }]}
                        >
                            <Input placeholder="First name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="lastName"
                            label="Last Name"
                            rules={[{ required: true, message: 'Last name required' }]}
                        >
                            <Input placeholder="Last name" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
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
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, type: "email", message: 'Please input  valid email!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="role"
                            label="Role"
                            rules={[{ required: true, message: 'Please choose Role' }]}
                        >
                            <Select placeholder="Please choose Role">
                                {Object.keys(USER_ROLES).map((role)=><Option value={role}>{USER_ROLES[role].display}</Option>)}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
        </Spin>
    )

};
export default UserDetail;

