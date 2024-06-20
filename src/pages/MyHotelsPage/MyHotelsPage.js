import React, { useState, useEffect } from 'react';
import { Layout, Card, Row, Col, Button, Modal, Typography, Carousel } from 'antd';
import Navbar from '../../components/Navbar/Navbar';
import HotelForm from '../../components/HotelForm/HotelForm';
import './MyHotelsPage.css'; // Import the CSS file

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
      const data = [
        {
          name: "aaa",
          description: "asd",
          location: "Location 1",
          benefits: ["wifi", "Kitchen"],
          availability: [
            { startDate: "01-06-2023", endDate: "30-06-2023", price: 100 },
            { startDate: "01-07-2023", endDate: "15-07-2023", price: 120 }
          ],
          photos: ["https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE2MjI1MjI0NDQ0MzYzMjM4Mg%3D%3D/original/ae3426d1-fba4-44d4-bed2-690426f25f7a.jpeg?im_w=1440&im_q=highq", "url2"],
          minimumGuests: 1,
          maximumGuests: 2,
          isPerGuest: true,
        },
      ];
      setHotels(data);
    };

    fetchHotels();
  }, []);

  const handleAddHotel = async (values) => {
    try {
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
                  description={
                    <div className="hotel-card-content">
                      <p>{hotel.location}</p>
                      <p>Benefits: {hotel.benefits}</p>
                      <div>
                        {hotel.availability.map((a, idx) => (
                          <p key={idx}>Availability: {a.startDate} - {a.endDate}, Price: ${a.price}</p>
                        ))}
                      </div>
                      <p>Guests: {hotel.minimumGuests} - {hotel.maximumGuests}</p>
                      <p>{hotel.isPerGuest ? "Price per guest" : "Fixed price"}</p>
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
