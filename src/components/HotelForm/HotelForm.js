import React, { useEffect } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const HotelForm = ({ initialValues, onFinish }) => {

    const [form] = Form.useForm();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields(); // Reset form fields when initialValues is null or undefined
        }
    }, [form, initialValues]);

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        if (e.fileList) {
            return e.fileList;
        }
        return [];
    };
  return (
    <Form
        form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input the hotel name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Location"
        name="location"
        rules={[{ required: true, message: 'Please input the location!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Amenities"
        name="amenities"
        rules={[{ required: true, message: 'Please input the amenities!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Photos"
        name="photos"
        rules={[{ required: true, message: 'Please upload photos!' }]}
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload listType="picture" multiple>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        label="Minimum Guests"
        name="minGuests"
        rules={[{ required: true, message: 'Please input the minimum number of guests!' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Maximum Guests"
        name="maxGuests"
        rules={[{ required: true, message: 'Please input the maximum number of guests!' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? 'Update Hotel' : 'Add Hotel'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default HotelForm;