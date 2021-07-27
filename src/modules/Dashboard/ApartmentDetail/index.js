import React, {useEffect, useState} from 'react';
import {Drawer, Form, Button, Col, Row, Input, Spin, Switch, Divider, Select, Modal, AutoComplete, message} from 'antd';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import {  saveApartment, updateApartment } from 'services/apartmentService';

import {allowOnlyNumber} from '../../../helpers/allowOnlyNumber'
import { NO_OF_ROOMS} from "../../../constants/filterConfig";
import {SOMETHING_WENT_WRONG, APARTMENT_SAVED_SUCCESS} from "../../../constants/messages";

const { Option } = Select;
const openStreetProvider = new OpenStreetMapProvider();


const ApartmentDetail = ({visible, initialValue, setDrawerVisibility,onSubmitUser}) => {
    const [form] = Form.useForm();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [autoCompleteData, setAutoCompleteData] = useState([]);
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
    const onAddressAutoComplete = async (input) => {
        try{
            const results = await openStreetProvider.search({ query: input });
            setAutoCompleteData(results.map(item => {
                return {...item, value: item.label}
            }))
        }catch(e){
            console.log(e)
        }

    };
    const onAutoCompleteSelect = (value, option) => {
        console.log(value,option)
        form.setFieldsValue({geoLocation:{
                lat:option.y,
                long:option.x
        }});
    };
    const onFinish = (values) =>{
        const { id } = initialValue || {};
        createApartment({...values, id});
    };
    const createApartment = async (payload) =>{
        setLoading(true);
        try {
            if(payload.id){
               await updateApartment(payload.id, payload);
            }else{
               await saveApartment(payload);
            }
            setLoading(false);
            message.success(APARTMENT_SAVED_SUCCESS,2).then(()=>{
                onSubmitUser()
            })
        } catch(e) {
            setLoading(false);
            setError(e.message || SOMETHING_WENT_WRONG)
        }
    }
    return (
            <Drawer
                title="Add Apartment"
                width={520}
                onClose={onClose}
                visible={visible}
                mask = {true}
                maskClosable = {false}
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
                <Spin tip={'Saving Apartment Detail'} spinning={isLoading}>

                <Form layout="vertical"
                      form={form}
                      onFinish={onFinish}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="apartmentName"
                                label="Apartment Name"
                                rules={[{ required: true, message: 'Apartment Name required' }]}
                            >
                                <Input placeholder="Apartment Name" />
                            </Form.Item>
                        </Col>
                    </Row>
                        <Row>
                        <Col span={24}>
                            <Form.Item
                                name="apartmentDescription"
                                label="Apartment Description"
                                rules={[{ required: true, message: 'Apartment Description required' }]}
                            >
                                <Input.TextArea rows={4} placeholder="Apartment Description" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Floor Area (Sqft)"
                                onKeyPress={allowOnlyNumber}
                                rules={[{ required: true, message: 'Floor Area required' }]}
                                name="floorAreaSize"
                                placeholder="Floor area"
                            >
                                <Input placeholder="Floor area" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Price Per Month (INR)"
                                name="pricePerMonth"
                                placeholder="Price per month"
                                onKeyPress={allowOnlyNumber}
                                rules={[{ required: true, message: 'Price per month required' }]}
                            >
                                <Input placeholder="Price per month" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Rented" name="isRented">
                                <Switch />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Number of Rooms" name="numberOfRooms"
                                       rules={[{ required: true, message: 'Number of rooms required' }]}>
                                <Select
                                    placeholder="Select Number of Rooms"
                                    allowClear
                                >
                                    {NO_OF_ROOMS.map(({value,label})=>{
                                        return <Option key={value} value={value}>{label}</Option>
                                    })}

                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider orientation="left" plain>
                       Location Detail
                    </Divider>
                    <Row>
                        <Col span={24}>
                            <AutoComplete
                                style={{ width: 200 }}
                                options={autoCompleteData}
                                placeholder="Search Address"
                                onSearch = {onAddressAutoComplete}
                                onSelect = {onAutoCompleteSelect}
                            />
                        </Col>
                    </Row>
                    <Divider orientation="left" plain>
                        Enter Lat/Long Manually
                    </Divider>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Lat/Long" style={{ marginBottom: 0 }}>
                                <Form.Item
                                    style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                                    name={['geoLocation','lat']}
                                    rules={[{ required: true,  message: 'Enter valid Latitude' }]}
                                ><Input placeholder="Enter Latitude"/>
                                </Form.Item>
                                <Form.Item
                                    style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                                    name={['geoLocation','long']}
                                   rules={[{ required: true,  message: 'Enter valid Longitude' }]}
                                >
                                    <Input placeholder="Enter Latitude"/>
                                </Form.Item>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                </Spin>

            </Drawer>
    )

};
export default ApartmentDetail;

