import React, { useState, useEffect } from 'react';
import { Layout, Card, Row, Col, Button, Modal, Typography } from 'antd';
import Navbar from '../../components/Navbar/Navbar';
import HotelForm from '../../components/HotelForm/HotelForm';

const { Content } = Layout;
const { Title } = Typography;

const MyHotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formInitialValues, setFormInitialValues] = useState(null); // State to manage form initialValues


  useEffect(() => {
    // Fetch host's hotels from backend
    const fetchHotels = async () => {
        const data = [{
            "name": "aaa",
            "description": "asd"
        }];
        setHotels(data);
    };

    fetchHotels();
  }, []);

  const handleAddHotel = async (values) => {
    try {
        console.log(values);
      const newHotel = values;
      setHotels([...hotels, newHotel]);
      setFormInitialValues(null); // Reset form initial values
      setModalVisible(false);
    } catch (error) {
      console.error('Failed to add hotel:', error);
    }
  };

  const handleEditHotel = async (values) => {
    try {
      const updatedHotel = values;
      setHotels(hotels.map(hotel => (hotel.name === updatedHotel.name ? updatedHotel : hotel)));
      setFormInitialValues(null); // Reset form initial values
      setModalVisible(false);
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
        onCancel={() => {
            setModalVisible(false);
            setIsEditMode(false);
            setFormInitialValues(null); // Reset form initial values on cancel
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