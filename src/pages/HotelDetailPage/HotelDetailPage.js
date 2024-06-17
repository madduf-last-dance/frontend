import React, { useState } from 'react';
import { Layout, Card, Carousel, List, Typography, Divider, Row, Col, DatePicker, InputNumber, Button, Avatar, Rate } from 'antd';
import { Comment } from '@ant-design/compatible';

import moment from 'moment'; // Import moment library

import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const hotels = [
    {
      id: 1,
      name: 'Hotel California',
      description: 'A lovely place, with great amenities and a wonderful view.',
      location: 'Los Angeles, CA',
      amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Free Parking'],
      photos: ['https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE2MjI1MjI0NDQ0MzYzMjM4Mg%3D%3D/original/ae3426d1-fba4-44d4-bed2-690426f25f7a.jpeg?im_w=1440&im_q=highq', 'https://via.placeholder.com/300', 'https://via.placeholder.com/300'],
      minGuests: 1,
      maxGuests: 4,
    },
    {
      id: 2,
      name: 'The Grand Budapest Hotel',
      description: 'An exquisite hotel with old-world charm and modern facilities.',
      location: 'Budapest, Hungary',
      amenities: ['WiFi', 'Restaurant', 'Spa', 'Concierge'],
      photos: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300', 'https://via.placeholder.com/300'],
      minGuests: 1,
      maxGuests: 2,
    },
    {
      id: 3,
      name: 'Hotel Transylvania',
      description: 'A spooky yet comfortable place to stay with family and friends.',
      location: 'Transylvania, Romania',
      amenities: ['WiFi', 'Swimming Pool', 'Gym', 'Free Parking'],
      photos: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300', 'https://via.placeholder.com/300'],
      minGuests: 1,
      maxGuests: 6,
    },
    // Add more hotel data as needed
  ];

  const reviews = [
    {
      author: 'John Doe',
      avatar: 'https://via.placeholder.com/40',
      content: 'Great place to stay! Very clean and comfortable.',
      rating: 5,
    },
    {
      author: 'Jane Smith',
      avatar: 'https://via.placeholder.com/40',
      content: 'Nice location but could be cleaner.',
      rating: 3,
    },
  ];
  
  const host = {
    name: 'Alice Johnson',
    avatar: 'https://via.placeholder.com/64',
    description: 'I am Alice, your host. I love meeting new people and ensuring they have a comfortable stay!',
  };

const { Content } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;

const HotelDetailPage = () => {

    const { id } = useParams();
    const hotel = hotels.find(hotel => hotel.id === parseInt(id));

    const [selectedDates, setSelectedDates] = useState(null);
    const [guests, setGuests] = useState(1);

    const handleDateChange = (dates) => {
      setSelectedDates(dates);
    };
  
    const handleGuestsChange = (value) => {
      setGuests(value);
    };
  
    const handleReservation = () => {
      // Handle reservation logic here
      console.log("Selected Dates:", selectedDates);
      console.log("Number of Guests:", guests);
      // Add your reservation logic, e.g., redirect to a reservation page, etc.
    };


    if (!hotel) {
      return <div>Hotel not found</div>;
    }

    return (
      <>
        <Navbar />
        <Content style={{ padding: '0 120px', marginTop: "42px"}}>
          <Row gutter={[16, 16]}>
            {/* Left Side - Hotel Details */}
            <Col span={10}>
              <Card
                title={hotel.name}
                bordered={true}
                style={{ maxWidth: 600, width: '100%' }} // Set max-width and full width
              >
                <Carousel autoplay>
                  {hotel.photos.map((photo, index) => (
                    <div key={index}>
                      <img src={photo} alt={`Hotel ${index}`} style={{ width: '100%' }} />
                    </div>
                  ))}
                </Carousel>
                <p>{hotel.description}</p>
                <p><strong>Location:</strong> {hotel.location}</p>
                <p><strong>Amenities:</strong></p>
                <List
                  dataSource={hotel.amenities}
                  renderItem={item => (
                    <List.Item>
                      {item}
                    </List.Item>
                  )}
                />
                <p><strong>Guests:</strong> {hotel.minGuests} - {hotel.maxGuests}</p>
              </Card>
            </Col>

            {/* Right Side - Reservation Form */}
            <Col span={8}>
              <Card title="Reservation" style={{ width: '100%' }}>
                <Title level={4}>Select Dates</Title>
                <RangePicker
                  style={{ width: '100%' }}
                  onChange={handleDateChange}
                  disabledDate={(current) => current && current < moment().startOf('day')}
                />

                <Divider />

                <Title level={4}>Number of Guests</Title>
                <InputNumber
                  min={1}
                  max={hotel.maxGuests}
                  defaultValue={1}
                  onChange={handleGuestsChange}
                  style={{ width: '100%' }}
                />

                <Divider />

                <Title level={4}>Price per Night</Title>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Add pricing logic here</p>

                <Divider />

                <Button type="primary" block onClick={handleReservation}>
                  Reserve Now
                </Button>
              </Card>
            </Col>
          </Row>

          {/* Reviews Section */}
          <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
            <Col span={18}>
              <Card title="Reviews" bordered={true}>
                {reviews.map((review, index) => (
                  <Comment
                    key={index}
                    author={review.author}
                    avatar={<Avatar src={review.avatar} />}
                    content={review.content}
                    datetime={
                      <Rate disabled defaultValue={review.rating} />
                    }
                  />
                ))}
              </Card>
            </Col>
          </Row>

          {/* Meet Your Host Section */}
          <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
            <Col span={18}>
              <Card title="Meet Your Host" bordered={true}>
                <Comment
                  author={host.name}
                  avatar={<Avatar src={host.avatar} size={64} />}
                  content={host.description}
                />
              </Card>
            </Col>
          </Row>

      </Content>
      </>
    );
  };
  
  export default HotelDetailPage;