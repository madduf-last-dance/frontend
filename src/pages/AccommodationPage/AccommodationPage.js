import React, { useState, useEffect } from 'react';
import { Layout, Card, Row, Col, Button, Modal, Typography, Carousel,message } from 'antd';
import Navbar from '../../components/Navbar/Navbar';
import { allHotelsHost, create, findById, update } from '../../services/accommodationService';
import { useParams } from 'react-router-dom';
import { accommodationReservations } from '../../services/reservationService';
import HostCalendar from '../../components/Calendar/HostCalendar';

const { Content } = Layout;
const { Title } = Typography;

const AccommodationPage = () => {
  const [hotels, setHotels] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formInitialValues, setFormInitialValues] = useState(null); // State to manage form initialValues
  
  const [accommodation, setAccommodation] = useState(null);
  const [reservations, setReservations] = useState(null);
  const { accommodationId } = useParams();

  useEffect(() => {
    if (accommodationId) {
      findById(accommodationId)
        .then((data) => {
          console.log("Accommodation fetched:", data);
          setAccommodation(data);
        })
        .catch((error) => {
          console.error("Failed to fetch accommodation:", error);
        });
        accommodationReservations(accommodationId).then(data => {
            console.log("Fetched Reservations for this accommodation:", data); 
            setReservations(data);
        });
    }
  }, [accommodationId]); 

  // Display a loading message while the accommodation is being fetched
  if (!accommodation) {
    return (
      <>
        <Navbar />
        <Content style={{ padding: '0 120px', marginTop: '42px' }}>
          <Title level={2}>Loading accommodation details...</Title>
        </Content>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Content style={{ padding: '0 120px', marginTop: '42px' }}>
        <Title level={2}>{accommodation.name} in {accommodation.location}</Title> 
      </Content>
      <HostCalendar
        availability={accommodation.availability}
        reservations={reservations}
      >

      </HostCalendar>
    </>
  );
};

export default AccommodationPage;
