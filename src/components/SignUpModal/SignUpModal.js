import React from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { registerGuest, registerHost } from "../../services/userService";

const SignUpModal = ({ visible, onClose, role }) => {

  const [form] = Form.useForm();

  const handleSignUp = (values) => {
    if (role === "guest") {
      registerGuest(values).then(data => {
        message.success('You have successfully registered as guest!');
        console.log("data: ", data);
      })
    }

    if (role === "host") {
      registerHost(values).then(data => {
        message.success('You have successfully registered as host!');
        console.log("data: ", data);
      })
    }

    onClose();
  };

  return (
    <Modal
      title={`Sign up as ${role === "guest" ? "Guest" : "Host"}`}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSignUp}>
        <Form.Item
          name="name"
          label="First Name"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="surname"
          label="Last Name"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "The input is not a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignUpModal;
