import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { login, profile } from '../../services/userService';
import { jwtDecode } from 'jwt-decode';

const LoginModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    login(values).then(data => {      
      const accessToken = data['access_token'];
      localStorage.setItem('accessToken', accessToken);
      const profileData = jwtDecode(accessToken);
      console.log(typeof(profileData['role']),profileData['role']);
      if(profileData['role'] === 0) {
          localStorage.setItem('role','HOST');
      } else if(profileData['role'] === 1) {
          localStorage.setItem('role','GUEST');
      } else{
          localStorage.setItem('role','MISSING_ROLE');
      }

      message.success('You have successfully logged in!');
      window.location.reload();
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
