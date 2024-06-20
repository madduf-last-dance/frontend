import React from 'react';
import { Layout, Card, List, Button, Modal, Row, Col, Tag,Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Navbar from '../../components/Navbar/Navbar';

const { Content } = Layout;
const { confirm } = Modal;
const { Title } = Typography;

// Sample reservations data
const reservations = [
  {
    id: 1,
    hotelName: "Hotel Zimbabve",
    startDate: "2023-06-01",
    endDate: "2023-06-05",
    status: "Confirmed",
  },
  {
    id: 2,
    hotelName: "Hotel California",
    startDate: "2023-07-10",
    endDate: "2023-07-15",
    status: "Pending",
  },
  
];

const MyReservationsPage = () => {

  // Function to handle reservation cancellation
  const handleCancelReservation = (reservationId) => {
    confirm({
      title: 'Are you sure you want to cancel this reservation?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        // Logic to cancel reservation
        const updatedReservations = reservations.filter(reservation => reservation.id !== reservationId);
        // Update state or perform any necessary actions
        console.log('Reservation cancelled:', reservationId);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <>
      <Navbar />
      <Content style={{ padding: '0 120px', marginTop: "42px" }}>
        <Title level={2}>My Reservations</Title>
        <Row gutter={[16, 16]}>
          {reservations.map((reservation) => (
            <Col span={8} key={reservation.id}>
              <Card
                title={reservation.hotelName}
                extra={<Tag color={getColorForStatus(reservation.status)}>{reservation.status}</Tag>}
                style={{ width: '100%', backgroundColor: '#f0f2f5' }}
              >
                <p><strong>Date:</strong><br></br> 
                {reservation.startDate} - {reservation.endDate}</p>
                <Button type="link" danger onClick={() => handleCancelReservation(reservation.id)}>Cancel</Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </>
  );
};

// Function to determine color based on reservation status
const getColorForStatus = (status) => {
    switch (status) {
      case "Confirmed":
        return "green";
      case "Pending":
        return "orange";
      case "Cancelled":
        return "red";
      default:
        return "blue";
    }
  };

export default MyReservationsPage;