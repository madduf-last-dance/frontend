import SearchBar from '../../components/SearchBar/SearchBar';
import Navbar from '../../components/Navbar/Navbar';

import { useNavigate } from 'react-router-dom';
import { Layout, Row, Col, Card } from 'antd';
import React, { useState, useEffect } from 'react';

const { Meta } = Card;
const { Content } = Layout;

const hotels1 = [
  {
    id: "1",
    name: "Hotel Zimbabve",
    description: "najjaci hotel koji postoji druze moj da l si lud da ovo omanes",
    location: "Zmaj Jovina bb",
    benefits: ["wifi", "Kitchen"],
    photos: ["https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE2MjI1MjI0NDQ0MzYzMjM4Mg%3D%3D/original/ae3426d1-fba4-44d4-bed2-690426f25f7a.jpeg?im_w=1440&im_q=highq", "url2"],
    minimumGuests: 1,
    maximumGuests: 5,
    isPerGuest: true,
  },
];


const HomePage = () => {

    const navigate = useNavigate();
    // const [hotels, setHotels] = useState(hotels1);
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
