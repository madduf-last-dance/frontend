import React, { useState, useEffect } from 'react';
import { Layout, Card, Row, Col, Button, Modal, Typography, Carousel,message } from 'antd';
import Navbar from '../../components/Navbar/Navbar';
import { allHotelsHost, create, findById, update } from '../../services/accommodationService';
import { useParams } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

const AccommodationPage = () => {
  const [hotels, setHotels] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formInitialValues, setFormInitialValues] = useState(null); // State to manage form initialValues
  
  const [accommodation, setAccommodation] = useState(null);
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
      <Modal
        title={isEditMode ? 'Edit Hotel' : 'Add New Hotel'}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setIsEditMode(false);
          setFormInitialValues(null);
        }}
        footer={null}
      >
      
      </Modal>
    </>
  );
};

export default AccommodationPage;
