// src/pages/HotelDetailPage.jsx  (or wherever your file is)
import React, { useState, useEffect } from 'react';
import {
  Layout,
  Card,
  Carousel,
  List,
  Typography,
  Divider,
  Row,
  Col,
  InputNumber,
  Button,
  Avatar,
  Rate,
  Select,
} from 'antd';
import { Comment } from '@ant-design/compatible';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { findById } from '../../services/accommodationService';
import { accommodationReservations, createReservation } from '../../services/reservationService';

import FrontCalendar from '../../components/Calendar/FrontCalendar';
import { jwtDecode } from 'jwt-decode';
import { Modal, message } from 'antd';
import { createRating, getRatingsForTarget } from '../../services/ratingService';

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const HotelDetailPage = () => {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [reservations, setReservations] = useState(null);

  // rating UI state
  const [accRating, setAccRating] = useState(0); // rating for accommodation
  const [hostRating, setHostRating] = useState(0); // rating for host

  // fetched ratings
  const [accRatingsMeta, setAccRatingsMeta] = useState({ ratings: [], average: null });
  const [hostRatingsMeta, setHostRatingsMeta] = useState({ ratings: [], average: null });

  // reservation form state
  const [selectedDates, setSelectedDates] = useState([]);
  const [guests, setGuests] = useState(1);

  const host = { name: 'Alice Johnson', avatar: 'https://via.placeholder.com/64', description: 'I am Alice, your host. I love meeting new people and ensuring they have a comfortable stay!', };

  useEffect(() => {
    // fetch accommodation details
    findById(id)
      .then((data) => {
        setHotel(data);
      })
      .catch((err) => {
        console.error('Failed to fetch accommodation', err);
      });

    // fetch reservations for this accommodation
    accommodationReservations(id)
      .then((data) => {
        setReservations(data);
      })
      .catch((err) => {
        console.error('Failed to fetch reservations', err);
      });

    // initial fetch ratings for accommodation & host (host id may be available after hotel loads)
    fetchAccRatings(id);
    // host ratings will be fetched after hotel is loaded (see below)
  }, [id]);

  // once hotel loads, fetch host ratings if hostId exists
  useEffect(() => {
    if (hotel?.hostId) {
      fetchHostRatings(hotel.hostId);
    }
  }, [hotel?.hostId]);

  const fetchAccRatings = (accommodationId) => {
    getRatingsForTarget('ACCOMMODATION', Number(accommodationId))
      .then((res) => {
        setAccRatingsMeta(res || { ratings: [], average: null });
      })
      .catch((err) => {
        console.error('Failed to load accommodation ratings', err);
        setAccRatingsMeta({ ratings: [], average: null });
      });
  };

  const fetchHostRatings = (hostId) => {
    getRatingsForTarget('HOST', Number(hostId))
      .then((res) => {
        setHostRatingsMeta(res || { ratings: [], average: null });
      })
      .catch((err) => {
        console.error('Failed to load host ratings', err);
        setHostRatingsMeta({ ratings: [], average: null });
      });
  };

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
  };

  const handleGuestsChange = (value) => {
    setGuests(value);
  };

  const handleReservation = () => {
    if (!selectedDates || selectedDates.length < 2) {
      message.error('Please select a valid date range.');
      return;
    }
    const reservationData = {
      startDate: selectedDates[0],
      endDate: selectedDates[1],
      guestNumber: guests,
      accommodationId: hotel.id,
      guestId: 1, // replace if you have real guest id from JWT
    };
    createReservation(reservationData)
      .then((data) => {
        message.success('Reservation created successfully');
        // optionally refresh reservations
        accommodationReservations(id).then((d) => setReservations(d));
      })
      .catch((error) => {
        console.error('Error creating reservation:', error);
        message.error('Failed to create reservation');
      });
  };

  const submitAccommodationRating = async () => {
  if (!accRating || accRating < 1) {
    message.error('Please select 1–5 stars for accommodation.');
    return;
  }
  if (!hotel?.id) {
    message.error('Accommodation not loaded yet.');
    return;
  }

  const payload = {
    rating: accRating,
    ratingId: hotel.id,
    ratingType: 'ACCOMMODATION',
  };

  try {
    await createRating(payload);
    message.success('Accommodation rating submitted — thanks!');
    setAccRating(0);
    fetchAccRatings(hotel.id);
  } catch (err) {
    console.error('createRating acc error', err?.response ?? err);

    const status = err?.response?.status;
    const msg = err?.response?.data?.message || err?.message || 'Failed to submit rating';
    if (status === 400) {
      Modal.warning({
        title: 'You can’t rate this accommodation',
        content: 'You must have completed a stay here before leaving a rating.',
      });
    } else if (status === 403) {
      Modal.warning({
        title: 'You can’t rate this accommodation',
        content: 'You must have completed a stay here before leaving a rating.',
      });
    } else if (status === 409) {
      Modal.info({
        title: 'You already rated this accommodation',
        content: 'You can update your rating instead of submitting a new one.',
      });
    } else {
      message.error(msg);
    }
  }
};


  const submitHostRating = async () => {
  if (!hostRating || hostRating < 1) {
    message.error('Please select 1–5 stars for host.');
    return;
  }

  const hostId = hotel?.hostId ?? hotel?.host?.id;
  if (!hostId) {
    message.error('Host ID not available for this accommodation.');
    return;
  }

  const payload = {
    rating: hostRating,
    ratingId: hostId,
    ratingType: 'HOST',
  };

  try {
    await createRating(payload);
    message.success('Host rating submitted — thanks!');
    setHostRating(0);
    fetchHostRatings(hostId);
  } catch (err) {
    console.error('createRating host error', err?.response ?? err);

    const status = err?.response?.status;
    const msg = err?.response?.data?.message || err?.message || 'Failed to submit rating';

     if (status === 400) {
      Modal.warning({
        title: 'You can’t rate this host',
        content: 'You must have completed a stay with this host before leaving a rating.',
      });
    } else if (status === 403) {
      Modal.warning({
        title: 'You can’t rate this host',
        content: 'You must have a completed stay with this host before leaving a rating.',
      });
    } else if (status === 409) {
      Modal.info({
        title: 'You already rated this host',
        content: 'You can update your rating instead of submitting a new one.',
      });
    } else {
      message.error(msg);
    }
  }
};

  // fallback rendering if hotel/reservations not loaded
  if (!hotel) {
    return (
      <>
        <Navbar />
        <Content style={{ padding: '0 120px', marginTop: '42px' }}>
          <Title level={2}>Loading accommodation...</Title>
        </Content>
      </>
    );
  }

  if (!reservations) {
    return (
      <>
        <Navbar />
        <Content style={{ padding: '0 120px', marginTop: '42px' }}>
          <Title level={2}>Loading reservations...</Title>
        </Content>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Content style={{ padding: '0 120px', marginTop: '42px' }}>
        <Row gutter={[16, 16]}>
          {/* Left Side - Hotel Details */}
          <Col span={12}>
            <Card title={hotel.name} bordered style={{ maxWidth: 600, width: '100%' }}>
              <Carousel autoplay>
                {(hotel.photos || []).map((photo, index) => (
                  <div key={index}>
                    <img src={`data:image/png;base64,${photo}`} alt={`Hotel ${index}`} style={{ width: '100%' }} />
                  </div>
                ))}
              </Carousel>

              <p>{hotel.description}</p>
              <p>
                <strong>Location:</strong> {hotel.location}
              </p>
              <p>
                <strong>benefits:</strong> {hotel.benefits}
              </p>

              <p>
                <strong>Guests:</strong> {hotel.minimumGuests} - {hotel.maximumGuests}
              </p>

              <Divider />

              <Title level={4}>Availability</Title>
              {(hotel.availability || []).map((avail, index) => (
                <p key={index}>
                  {moment(avail.startDate, 'YYYY-MM-DD').format('MMM D, YYYY')} -{' '}
                  {moment(avail.endDate, 'YYYY-MM-DD').format('MMM D, YYYY')}
                  <br />
                  Price per {hotel.isPriceGuest ? 'Guest' : 'Day'} : $<b>{avail.price}</b>
                </p>
              ))}
            </Card>
          </Col>

          {/* Right Side - Reservation Form & Rating UI */}
          <Col span={12}>
            <Card title="Reservation" style={{ width: '100%' }}>
              <div>
                <h3>Select Dates:</h3>
                <FrontCalendar
                  availability={hotel.availability}
                  reservations={reservations}
                  onDatesSelected={(dates) => setSelectedDates([dates.start, dates.end])}
                />
              </div>

              <Divider />

              <Title level={4}>Number of Guests</Title>
              <InputNumber min={1} max={hotel.maximumGuests || hotel.maxGuests || 10} defaultValue={1} onChange={handleGuestsChange} style={{ width: '100%' }} />

              <Divider />

              <Button type="primary" block onClick={handleReservation}>
                Reserve Now
              </Button>

              <Divider />

              {/* Rating UI - two separate controls and buttons */}
              <div style={{ marginTop: 16 }}>
                <Title level={5}>Rate accommodation</Title>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Rate value={accRating} onChange={(v) => setAccRating(v)} />
                  <Button type="primary" onClick={submitAccommodationRating}>
                    Rate Accommodation
                  </Button>
                </div>

                <Divider />

                <Title level={5}>Rate host</Title>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Rate value={hostRating} onChange={(v) => setHostRating(v)} />
                  <Button type="primary" onClick={submitHostRating}>
                    Rate Host
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Reviews Section (accommodation ratings) */}
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col span={18}>
            <Card title={`Accommodation reviews (avg: ${accRatingsMeta.average ? accRatingsMeta.average.toFixed(2) : '—'})`} bordered>
              <List
                dataSource={accRatingsMeta.ratings}
                renderItem={(r) => (
                  <List.Item key={r.id}>
                    <List.Item.Meta
                      avatar={<Avatar>{String(r.userId ?? r.usedId ?? 'U').charAt(0)}</Avatar>}
                      title={
                        <div>
                          <b>User #{r.userId ?? r.usedId}</b> — <Rate disabled defaultValue={r.rating} />
                        </div>
                      }
                      description={<div>Rated on: {new Date(r.createdAt ?? r.updatedAt ?? Date.now()).toLocaleString()}</div>}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        {/* Meet Your Host Section */}
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col span={18}>
            <Card title="Meet Your Host" bordered>
              <Comment author={host.name} avatar={<Avatar src={host.avatar} size={64} />} content={host.description} />
              <Divider />
              <Card type="inner" title={`Host reviews (avg: ${hostRatingsMeta.average ? hostRatingsMeta.average.toFixed(2) : '—'})`}>
                <List
                  dataSource={hostRatingsMeta.ratings}
                  renderItem={(r) => (
                    <List.Item key={r.id}>
                      <List.Item.Meta
                        avatar={<Avatar>{String(r.userId ?? r.usedId ?? 'U').charAt(0)}</Avatar>}
                        title={
                          <div>
                            <b>User #{r.userId ?? r.usedId}</b> — <Rate disabled defaultValue={r.rating} />
                          </div>
                        }
                        description={<div>Rated on: {new Date(r.createdAt ?? r.updatedAt ?? Date.now()).toLocaleString()}</div>}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default HotelDetailPage;
