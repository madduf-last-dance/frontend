import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { login } from '../../services/userService';

const LoginModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    login(values).then(data => {      
      const { accessToken } = data;
      localStorage.setItem('accessToken', accessToken);

      message.success('You have successfully logged in!');
      console.log('data:', data);
    })

    onClose();
  };

  return (
    <Modal
      title="Log In"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;
