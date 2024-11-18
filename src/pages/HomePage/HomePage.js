import SearchBar from '../../components/SearchBar/SearchBar';
import Navbar from '../../components/Navbar/Navbar';

import { useNavigate } from 'react-router-dom';
import { Layout, Row, Col, Card } from 'antd';
import React, { useState, useEffect } from 'react';

const { Meta } = Card;
const { Content } = Layout;


const HomePage = () => {

    const navigate = useNavigate();
    const [hotels, setHotels] = useState([]);

    const updateHotels = (newHotels) => {
      setHotels(newHotels);
    };

    const handleCardClick = (id) => {
      navigate(`/hotels/${id}`);
    };

  return (
    <>
        <Navbar />
        <SearchBar updateHotels={updateHotels}/>
        <div>
            <Content style={{ padding: '0 120px', marginTop: "42px" }}>
              <Row gutter={16} style={{ marginTop: '20px' }}>
                {hotels.map((hotel, index) => (
                  <Col span={6} key={index}>
                    <Card hoverable
                      cover={<img alt={hotel.name} /* src={hotel.photos[0]}  *//>}
                      onClick={() => handleCardClick(hotel.id)}
                    >
                      <Meta title={hotel.name} description={`${hotel.location}`} />
                      <div>
                      </div>
                    </Card>
                  </Col>
                ))}
                </Row>
            </Content>
        </div>
    </>
  );
};

export default HomePage;
