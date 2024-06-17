import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Layout, message, Modal } from 'antd';
import Navbar from '../../components/Navbar/Navbar';
import './ProfilePage.css';

const { Content } = Layout;

const ProfilePage = () => {

  const [userProfile, setUserProfile] = useState({});
  const [profileForm] = Form.useForm();
  const [usernameForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const [usernameModalVisible, setUsernameModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  useEffect(() => {
    fetchUserProfileData();
  }, []);

  useEffect(() => {
    profileForm.setFieldsValue(userProfile);
    usernameForm.setFieldsValue({ username: userProfile.username });
  }, [userProfile, profileForm, usernameForm]);

  const fetchUserProfileData = async () => {
    try {
      // Simulated user profile data
      const userProfileData = {
        firstName: "Marko",
        lastName: "Markovic",
        username: 'JohnDoe',
        email: 'johndoe@example.com',
      };

      setUserProfile(userProfileData);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const handleProfileUpdate = (values) => {
    setUserProfile(values);
    message.success('Profile updated successfully!');
    // Call the backend API to update profile information here
  };

  const handleUsernameUpdate = (values) => {
    console.log(values);
    setUsernameModalVisible(false); // Hide the modal
    message.success('Username updated successfully!');
    // Call the backend API to update the username here
  };

  const handlePasswordUpdate = (values) => {
    console.log(values);
    setPasswordModalVisible(false); // Hide the modal
    message.success('Password updated successfully!');
    // Call the backend API to update the password here
  };

  const showUsernameModal = () => {
    setUsernameModalVisible(true);
  };

  const showPasswordModal = () => {
    setPasswordModalVisible(true);
  };

  const handleCancelUsernameModal = () => {
    setUsernameModalVisible(false);
  };

  const handleCancelPasswordModal = () => {
    setPasswordModalVisible(false);
  };

  return (
    <>
      <Navbar />
      <Content style={{ padding: '0 120px', marginTop: '42px' }}>
        <div className="profile-page">
          <h2>Profile Page</h2>

          {/* Profile Update Form */}
          <Form
            form={profileForm}
            layout="vertical"
            initialValues={userProfile}
            onFinish={handleProfileUpdate}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input type="email" />
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

          {/* Change Username Button */}
          <Button type="link" onClick={showUsernameModal} style={{ marginBottom: '16px' }}>
            Change Username
          </Button>

          {/* Change Password Button */}
          <Button type="link" onClick={showPasswordModal} style={{ marginBottom: '16px', marginLeft: '16px' }}>
            Change Password
          </Button>

          {/* Username Update Modal */}
          <Modal
            title="Change Username"
            visible={usernameModalVisible}
            onCancel={handleCancelUsernameModal}
            footer={[
              <Button key="cancel" onClick={handleCancelUsernameModal}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={() => usernameForm.submit()}>
                Update
              </Button>,
            ]}
          >
            <Form
              form={usernameForm}
              layout="vertical"
              initialValues={{ username: userProfile.username }}
              onFinish={handleUsernameUpdate}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>

          {/* Password Update Modal */}
          <Modal
            title="Change Password"
            visible={passwordModalVisible}
            onCancel={handleCancelPasswordModal}
            footer={[
              <Button key="cancel" onClick={handleCancelPasswordModal}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={() => passwordForm.submit()}>
                Update
              </Button>,
            ]}
          >
            <Form
              form={passwordForm}
              layout="vertical"
              onFinish={handlePasswordUpdate}
            >
              <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[{ required: true, message: 'Please input your current password!' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[{ required: true, message: 'Please input your new password!' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Confirm New Password"
                name="confirmNewPassword"
                rules={[
                  { required: true, message: 'Please confirm your new password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </Content>
    </>
  );
};

export default ProfilePage;