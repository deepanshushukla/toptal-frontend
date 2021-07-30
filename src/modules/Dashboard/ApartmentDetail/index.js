import React, { useEffect, useState, useMemo } from "react";
import PropTypes from 'prop-types'
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Spin,
  Switch,
  Divider,
  Select,
  InputNumber,
  AutoComplete,
  message,
  Alert,
} from "antd";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { saveApartment, updateApartment } from "services/apartmentService";

import { allowOnlyNumber } from "../../../helpers/allowOnlyNumber";
import  debounce  from "../../../helpers/debounce";
import { NO_OF_ROOMS } from "../../../constants/filterConfig";
import {
  SOMETHING_WENT_WRONG,
  APARTMENT_SAVED_SUCCESS,
} from "../../../constants/messages";

const { Option } = Select;
const openStreetProvider = new OpenStreetMapProvider();

const ApartmentDetail = ({
  visible,
  initialValue,
  setDrawerVisibility,
  onSubmitApartment,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [autoCompleteValue, setAutoCompleteValue] = useState('');
  const [autoCompleteData, setAutoCompleteData] = useState([]);
  const onAddressAutoComplete = async (input) => {
    try {
      const results = await openStreetProvider.search({ query: input });
      setAutoCompleteData(
          results.map((item) => {
            return { ...item, value: item.label };
          })
      );
    } catch (e) {
      console.log(e);
    }
  };
  const debouncedAutoComplete = useMemo(
      () => debounce(onAddressAutoComplete, 500)
      , []);

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
      setAutoCompleteValue('');
    }
  }, [initialValue, visible]);

  const onClose = () => {
    setDrawerVisibility(false);
  };


  const onAutoCompleteSelect = (value, option) => {
    form.setFieldsValue({
      geoLocation: {
        lat: option.y,
        long: option.x,
      },
    });
  };
  const onAutoCompleteChange =(data)=>{
    setAutoCompleteValue(data)
  };
  const onFinish = (values) => {
    const { id } = initialValue || {};
    createApartment({ ...values, id });
  };
  const createApartment = async (payload) => {
    setLoading(true);
    setError('');
    try {
      if (payload.id) {
        await updateApartment(payload.id, payload);
      } else {
        await saveApartment(payload);
      }
      setLoading(false);
      onSubmitApartment(payload.id);
      message.success(APARTMENT_SAVED_SUCCESS)
    } catch (e) {
      setLoading(false);
      setError(e.message || SOMETHING_WENT_WRONG);
    }
  };
  return (
    <Drawer
      title="Add Apartment"
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
          <Button onClick={() => form.submit()} disabled={isLoading} type="primary">
            Submit
          </Button>
        </div>
      }
    >
      <Spin tip={"Saving Apartment Detail"} spinning={isLoading}>
        <Form layout="vertical" form={form} name={'apartmentDetailForm'} onFinish={onFinish}>
          {error && (
              <Row style={{marginBottom:'8px'}}>
                <Col span={24}>
                  <Alert message={error} closable type="error" showIcon />
                </Col>
              </Row>
          )}
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="apartmentName"
                label="Apartment Name"
                rules={[{ required: true, message: "Apartment Name required" }]}
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
                rules={[
                  { required: true, message: "Apartment Description required" },
                ]}
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
                rules={[{ required: true, message: "Floor Area required" }]}
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
                rules={[
                  { required: true, message: "Price per month required" },
                ]}
              >
                <Input placeholder="Price per month" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Rented" name="isRented" valuePropName={'checked'}>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Number of Rooms"
                name="numberOfRooms"
                rules={[
                  { required: true, message: "Number of rooms required" },
                ]}
              >
                <Select placeholder="Select Number of Rooms" allowClear>
                  {NO_OF_ROOMS.map(({ value, label }) => {
                    return (
                      <Option key={value} value={value}>
                        {label}
                      </Option>
                    );
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
                style={{ width: '100%', marginBottom:'8px' }}
                value={autoCompleteValue}
                options={autoCompleteData}
                onSearch={debouncedAutoComplete}
                onSelect={onAutoCompleteSelect}
                onChange={onAutoCompleteChange}
              >
                <Input.Search size="large" placeholder="Search Address" enterButton />
              </AutoComplete>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                  label="Latitude"
                  name={["geoLocation", "lat"]}
                  rules={[{ required: true, message: "Enter valid Latitude" }]}
                >
                  <InputNumber  min="-90"  max="90" placeholder="Enter Latitude" style={{width:'100%'}}/>
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                  label="Longitude"
                  name={["geoLocation", "long"]}
                  rules={[{ required: true, message: "Enter valid Longitude" }]}
                >
                  <InputNumber min="-180"  max="180" placeholder="Enter Latitude" style={{width:'100%'}}/>
                </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Drawer>
  );
};

ApartmentDetail.propTypes = {
  initialValue: PropTypes.object.isRequired,
  onSubmitApartment: PropTypes.func.isRequired,
  setDrawerVisibility: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
};
export default ApartmentDetail;
