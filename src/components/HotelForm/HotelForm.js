import React, { useEffect } from 'react';
import { Form, Input, Button, DatePicker, InputNumber, Upload, Checkbox } from 'antd';
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const HotelForm = ({ initialValues, onFinish }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        availability: initialValues.availability.map(a => ({
          ...a,
          startDate: dayjs(a.startDate, 'DD-MM-YYYY'),
          endDate: dayjs(a.endDate, 'DD-MM-YYYY'),
        })),
        photos: initialValues.photos.map((url, index) => ({
          uid: index,
          name: `photo_${index}`,
          status: 'done',
          url
        }))      
      });
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

  const onFinishHandler = (values) => {
    const formattedValues = {
      ...values,
      availability: values.availability.map(a => ({
        ...a,
        startDate: a.startDate.format('DD-MM-YYYY'),
        endDate: a.endDate.format('DD-MM-YYYY')
      })),
      photos: values.photos.map(file => file.url || URL.createObjectURL(file.originFileObj))
    };
    console.log(formattedValues);
    onFinish(formattedValues);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinishHandler}>
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
        label="Benefits"
        name="benefits"
        rules={[{ required: true, message: 'Please input the benefits!' }]}
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
        <Upload
          listType="picture"
          multiple
          beforeUpload={() => false} // Prevent automatic upload
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        label="Minimum Guests"
        name="minimumGuests"
        rules={[{ required: true, message: 'Please input the minimum number of guests!' }]}
      >
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item
        label="Maximum Guests"
        name="maximumGuests"
        rules={[{ required: true, message: 'Please input the maximum number of guests!' }]}
      >
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item
        label="Price per Guest"
        name="isPerGuest"
        valuePropName="checked"
        style={{ display: 'flex', justifyContent: 'flex-start' }}
      >
        <Checkbox />
      </Form.Item>
      <Form.List
        name="availability"
        rules={[
          {
            validator: async (_, availabilities) => {
              if (!availabilities || availabilities.length < 1) {
                return Promise.reject(new Error('At least one availability is required'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div key={key} style={{ display: 'flex', marginBottom: 8 }}>
                <Form.Item
                  {...restField}
                  name={[name, 'startDate']}
                  fieldKey={[fieldKey, 'startDate']}
                  rules={[{ required: true, message: 'Missing start date' }]}
                  style={{ flex: 1 }}
                >
                  <DatePicker placeholder="Start Date" format="DD-MM-YYYY"/>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'endDate']}
                  fieldKey={[fieldKey, 'endDate']}
                  rules={[{ required: true, message: 'Missing end date' }]}
                  style={{ flex: 1, marginLeft: 8 }}
                >
                  <DatePicker placeholder="End Date" format="DD-MM-YYYY"/>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'price']}
                  fieldKey={[fieldKey, 'price']}
                  rules={[{ required: true, message: 'Missing price' }]}
                  style={{ flex: 1, marginLeft: 8 }}
                >
                  <InputNumber placeholder="Price" />
                </Form.Item>
                <MinusCircleOutlined
                  style={{ margin: '0 8px', alignSelf: 'center' }}
                  onClick={() => remove(name)}
                />
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
                style={{ width: '100%' }}
              >
                Add Availability
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? 'Update Hotel' : 'Add Hotel'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default HotelForm;
