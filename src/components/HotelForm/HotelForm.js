import React from 'react';
import { Form, Input, Button, List, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const HotelForm = ({ initialValues, onFinish }) => {
  return (
    <Form
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