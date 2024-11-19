import React, { useState } from 'react';
import { Layout, Card, Carousel, List, Typography, Divider, Row, Col, DatePicker, InputNumber, Button, Avatar, Rate } from 'antd';
import { Comment } from '@ant-design/compatible';

import moment from 'moment'; // Import moment library

import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { findById } from '../../services/accommodationService';
import { accommodationReservations } from '../../services/reservationService';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { getRoles } from '@testing-library/react';
import { createReservation } from '../../services/reservationService';

import FrontCalendar from '../../components/Calendar/FrontCalendar';

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

    const [hotel, setHotel] = useState(null);
    const [reservations, setReservations] = useState(null);

    useEffect(() => {
      findById(id).then(data => {
        console.log("Fetched Data:", data); 
        setHotel(data);
      });
      accommodationReservations(id).then(data => {
        console.log("Fetched Reservations:", data); 
        setReservations(data);
      });
    }, [id]);

    // -- Calendar --

    // Show green when there are avaliable dates
    const availabilityEvents = hotel?.availability.map(avail => ({
      title: 'Available',
      start: avail.startDate,
      end: avail.endDate,
      display: 'background',
      backgroundColor: 'green',
      borderColor: 'green',
    })) || [];

    const [selectedDates, setSelectedDates] = useState([]);
    const [guests, setGuests] = useState(1);

    const handleDateChange = (dates) => {
      setSelectedDates(dates);
    };
  
    const handleGuestsChange = (value) => {
      setGuests(value);
    };
  
    const handleReservation = () => {
      
      if (!selectedDates || selectedDates.length < 2) {
        console.error("Please select a valid date range.");
        return;
      }
      console.log("Selected Dates:", selectedDates);
      console.log("Number of Guests:", guests);
      // Add your reservation logic, e.g., redirect to a reservation page, etc.
      const reservationData = {
          startDate: selectedDates[0],
          endDate: selectedDates[1],
          guestNumber: guests,
          accommodationId: hotel.id,
          guestId: 1,
      };
      createReservation(reservationData)
      .then((data) => {
        console.log("Reservation created successfully:", data);
      })
      .catch((error) => {
        console.error("Error creating reservation. Reservation data:", reservationData);
        console.error("Error details:", error);
      });
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
                <p><strong>benefits:</strong> {hotel.benefits} </p>

                <p><strong>Guests:</strong> {hotel.minimumGuests} - {hotel.maximumGuests}</p>

                <Divider />

                <Title level={4}>Availability</Title>
                  {hotel.availability.map((avail, index) => (
                    <p key={index}>
                      {moment(avail.startDate, "YYYY-MM-DD").format("MMM D, YYYY")} - {moment(avail.endDate, "YYYY-MM-DD").format("MMM D, YYYY")}
                      <br></br>Price per {hotel.isPriceGuest ? "Guest" : "Day"} : $<b>{avail.price}</b>
                    </p>
                  ))}
              </Card>
            </Col>

            {/* Right Side - Reservation Form */}
            <Col span={8}>
              <Card title="Reservation" style={{ width: '100%' }}>
              <div className="App">
                <h1>Select Dates:</h1>
                <FrontCalendar
                  availability={hotel.availability}
                  reservations={reservations}
                  onDatesSelected={(dates) => setSelectedDates([dates.start, dates.end])}
                />
                </div>

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
