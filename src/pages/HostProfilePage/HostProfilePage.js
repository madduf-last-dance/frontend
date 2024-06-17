import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, List, Card, Avatar, Row, Col, Typography, Rate, Divider } from 'antd';
import Navbar from '../../components/Navbar/Navbar';
import './HostProfilePage.css'; // Add custom styling here

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const HostProfilePage = () => {
  const { hostId } = useParams(); // Assuming you have a way to get hostId from URL params

  const [hostProfile, setHostProfile] = useState({});
  const [hostReviews, setHostReviews] = useState([]);
  const [hostListings, setHostListings] = useState([]);

  useEffect(() => {
    fetchHostProfileData();
    fetchHostReviews();
    fetchHostListings();
  }, [hostId]);

  const fetchHostProfileData = async () => {
    try {
      // Simulating fetching host profile data from backend based on hostId
      const hostProfileData = {
        firstName: "Marko",
        lastName: "Markovic",
        username: 'JohnDoe',
        email: 'johndoe@example.com',
        bio: 'I love hosting and meeting new people. My goal is to provide a comfortable and enjoyable stay for all my guests.',
        profilePicture: 'https://via.placeholder.com/150',
        // Add more relevant profile data as needed
      };
      setHostProfile(hostProfileData);
    } catch (error) {
      console.error('Failed to fetch host profile:', error);
    }
  };

  const fetchHostReviews = async () => {
    try {
      // Simulating fetching host reviews from backend based on hostId
      const reviewsData = [
        { id: 1, reviewer: 'Alice', comment: 'Great host!', rating: 5 },
        { id: 2, reviewer: 'Bob', comment: 'Amazing experience.', rating: 4 },
        // Add more review objects
      ];
      setHostReviews(reviewsData);
    } catch (error) {
      console.error('Failed to fetch host reviews:', error);
    }
  };

  const fetchHostListings = async () => {
    try {
      // Simulating fetching host listings from backend based on hostId
      const listingsData = [
        { id: 1, name: 'Cozy Retreat', location: 'City A', price: '$100/night', image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Luxury Villa', location: 'City B', price: '$300/night', image: 'https://via.placeholder.com/150' },
        // Add more listing objects
      ];
      setHostListings(listingsData);
    } catch (error) {
      console.error('Failed to fetch host listings:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Content style={{ padding: '0 50px', marginTop: '42px' }}>
        <div className="host-profile-page">
          {/* Profile Header */}
          <Row gutter={[16, 16]} className="host-profile-header">
            <Col span={4}>
              <Avatar size={100} src={hostProfile.profilePicture} />
            </Col>
            <Col span={20}>
              <Title level={2}>{`${hostProfile.firstName} ${hostProfile.lastName}`}</Title>
              <Paragraph>{hostProfile.bio}</Paragraph>
            </Col>
          </Row>
          <Divider />
          {/* Host Reviews */}
          <div className="host-reviews">
            <Title level={3}>Reviews</Title>
            <div className="reviews-scroll-container">
              <div className="reviews-cards">
                {hostReviews.map(item => (
                  <Card key={item.id} className="review-card">
                    <Card.Meta
                      avatar={<Avatar size="small">{item.reviewer.charAt(0)}</Avatar>}
                      title={item.reviewer}
                      description={<Rate disabled defaultValue={item.rating} />}
                    />
                    <Paragraph ellipsis={{ rows: 2 }}>{item.comment}</Paragraph>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <Divider />

          {/* Host Listings */}
          <div className="host-listings">
            <Title level={3}>Listings</Title>
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={hostListings}
              renderItem={item => (
                <List.Item>
                  <Card
                    cover={<img alt={item.name} src={item.image} />}
                    hoverable
                  >
                    <Card.Meta title={item.name} description={`${item.location} - ${item.price}`} />
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </div>
      </Content>
    </>
  );
};

export default HostProfilePage;