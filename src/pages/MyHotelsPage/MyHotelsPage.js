import React, { useState, useEffect } from 'react';
import { Layout, Card, Row, Col, Button, Modal, Typography } from 'antd';
import Navbar from '../../components/Navbar/Navbar';
import HotelForm from '../../components/HotelForm/HotelForm';

const { Content } = Layout;
const { Title } = Typography;

const MyHotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentHotel, setCurrentHotel] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Fetch host's hotels from backend
    const fetchHotels = async () => {
      try {
        const data = [];
        setHotels(data);
      } catch (error) {
        console.error('Failed to fetch hotels:', error);
      }
    };
    fetchHotels();
  }, []);

  const handleAddHotel = async (values) => {
    try {
      const newHotel = values;
      setHotels([...hotels, newHotel]);
      setModalVisible(false);
    } catch (error) {
      console.error('Failed to add hotel:', error);
    }
  };

  const handleEditHotel = async (values) => {
    try {
      const updatedHotel = values;
      setHotels(hotels.map(hotel => (hotel.id === updatedHotel.id ? updatedHotel : hotel)));
      setModalVisible(false);
    } catch (error) {
      console.error('Failed to update hotel:', error);
    }
  };

  const openAddModal = () => {
    setCurrentHotel(null);
    setIsEditMode(false);
    setModalVisible(true);
  };

  const openEditModal = (hotel) => {
    setCurrentHotel(hotel);
    setIsEditMode(true);
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
                hoverable
                cover={<img alt={hotel.name} src={hotel.img} />}
                actions={[
                  <Button type="link" onClick={() => openEditModal(hotel)}>
                    Edit
                  </Button>,
                ]}
              >
                <Card.Meta title={hotel.name} description={hotel.description} />
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
      <Modal
        title={isEditMode ? 'Edit Hotel' : 'Add New Hotel'}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <HotelForm
          initialValues={currentHotel || {}}
          onFinish={isEditMode ? handleEditHotel : handleAddHotel}
        />
      </Modal>
    </>
  );
};

export default MyHotelsPage;