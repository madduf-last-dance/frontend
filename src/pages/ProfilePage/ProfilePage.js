import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Layout, message } from 'antd';
import Navbar from '../../components/Navbar/Navbar';
import './ProfilePage.css';

const { Content } = Layout;

const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState({});
    const [form] = Form.useForm();

  useEffect(() => {
    fetchUserProfileData();
  }, []);

  useEffect(() => {
    // When userProfile changes, update form initialValues
    form.setFieldsValue(userProfile);
  }, [userProfile]); // Trigger whenever userProfile changes
  
  const fetchUserProfileData = async () => {
    try {
      const userProfileData = {
        firstName: "marko",
        lastName: "markovic",
        username: 'JohnDoe',
        email: 'johndoe@example.com',
      };
    
      setUserProfile(userProfileData);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const onFinish = (values) => {
    setUserProfile(values);
    message.success('Profile updated successfully!');
  };

  return (
    <>
      <Navbar />
      <Content style={{ padding: '0 120px', marginTop: '42px' }}>
        <div className="profile-page">
          <h2>Profile Page</h2>
          <Form
            form={form}
            layout="vertical"
            initialValues={userProfile}
            onFinish={onFinish}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please input your last name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </>
  );
};

export default ProfilePage;