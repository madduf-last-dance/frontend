import React, { useState, useEffect } from 'react';
import { Layout, Card, Row, Col, Button, Modal, Typography, Carousel,message } from 'antd';
import Navbar from '../../components/Navbar/Navbar';
import HotelForm from '../../components/HotelForm/HotelForm';
import './MyHotelsPage.css'; // Import the CSS file
import { allHotelsHost, create, update } from '../../services/accommodationService';

const { Content } = Layout;
const { Title } = Typography;

const MyHotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formInitialValues, setFormInitialValues] = useState(null); // State to manage form initialValues

  useEffect(() => {
    // Fetch host's hotels from backend
    allHotelsHost().then(
        data => { 
        console.log(data);
        setHotels(data); });
  }, []);

  const handleAddHotel = async (values) => {
    try {
      values.benefitIds = [];
      values.hostId = 1;
      create(values).then(
        data => {
          setFormInitialValues(null); // Reset form initial values
          setModalVisible(false);
          message.success('Added new accommodation');
          allHotelsHost().then(
            data => { setHotels(data); });
          }
      )
    } catch (error) {
      console.error('Failed to add hotel:', error);
    }
  };

  const handleEditHotel = async (values) => {
    try {
      values.benefitIds = [];
      values.hostId = 1;
      update(values).then(
        data => {
          setFormInitialValues(null); // Reset form initial values
          setModalVisible(false);
          message.success('Added new accommodation');
          allHotelsHost().then(
            data => { setHotels(data); });
          }
      )
    } catch (error) {
      console.error('Failed to update hotel:', error);
    }
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setFormInitialValues(null); // Initialize form with empty values
    setModalVisible(true);
  };

  const openEditModal = (hotel) => {
    console.log(hotel);
    setIsEditMode(true);
    setFormInitialValues(hotel); // Initialize form with empty values
    setModalVisible(true);
  };

  return (
    <>
      <Navbar />
      <Content style={{ padding: '0 120px', marginTop: '42px' }}>
        <Title level={2}>My Hotels</Title>
        <Button type="primary" onClick={openAddModal}>
          Add New Hotel
        </Button>
        <Row gutter={16} style={{ marginTop: '20px' }}>
          {hotels.map((hotel, index) => (
            <Col span={6} key={index}>
              <Card
                className="hotel-card"
                hoverable
                cover={
                  <Carousel autoplay>
                    {hotel.photos.map((photo, index) => (
                      <div key={index}>
                        <img src={photo} alt={`Hotel ${index}`} style={{ width: '100%' }} />
                      </div>
                    ))}
                  </Carousel>
                }
                actions={[
                  <Button type="link" onClick={() => openEditModal(hotel)}>
                    Edit
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={hotel.name}
                  id={hotel.id}
                  description={
                    <div className="hotel-card-content">
                      <p>{hotel.id}</p>
                      <p>{hotel.location}</p>
                      <div>
                        {hotel.availability.map((avail, idx) => (
                         <p key={idx} style={{ marginBottom: '5px', fontSize: '12px' }}>
                          {avail.startDate} - {avail.endDate} 
                          <br></br>$<b>{avail.price}</b>
                          </p>
                        ))}
                      </div>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
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
        <HotelForm
          initialValues={formInitialValues}
          onFinish={isEditMode ? handleEditHotel : handleAddHotel}
        />
      </Modal>
    </>
  );
};

export default MyHotelsPage;
