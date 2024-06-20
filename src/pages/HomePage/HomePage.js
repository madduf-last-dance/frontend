import SearchBar from '../../components/SearchBar/SearchBar';
import Navbar from '../../components/Navbar/Navbar';

import { useNavigate } from 'react-router-dom';
import { Layout, Row, Col, Card } from 'antd';

const { Meta } = Card;
const { Content } = Layout;

const hotels = [
  {
    id: "1",
    name: "Hotel Zimbabve",
    description: "najjaci hotel koji postoji druze moj da l si lud da ovo omanes",
    location: "Zmaj Jovina bb",
    benefits: ["wifi", "Kitchen"],
    availability: [
      { startDate: "01-06-2023", endDate: "30-06-2023", price: 100 },
      { startDate: "01-07-2023", endDate: "15-07-2023", price: 120 }
    ],
    photos: ["https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE2MjI1MjI0NDQ0MzYzMjM4Mg%3D%3D/original/ae3426d1-fba4-44d4-bed2-690426f25f7a.jpeg?im_w=1440&im_q=highq", "url2"],
    minimumGuests: 1,
    maximumGuests: 5,
    isPerGuest: true,
  },
];


const HomePage = () => {

    const navigate = useNavigate();

    const handleCardClick = (id) => {
      navigate(`/hotels/${id}`);
    };

  return (
    <>
        <Navbar />
        <SearchBar />
        <div>
            <Content style={{ padding: '0 120px', marginTop: "42px" }}>
              <Row gutter={16} style={{ marginTop: '20px' }}>
                {hotels.map((hotel, index) => (
                  <Col span={6} key={index}>
                    <Card hoverable
                      cover={<img alt={hotel.name} src={hotel.photos[0]} />}
                      onClick={() => handleCardClick(hotel.id)}
                    >
                      <Meta title={hotel.name} description={`${hotel.location}`} />
                      <div>
                        {hotel.availability.map((avail, idx) => (
                         <p key={idx} style={{ marginBottom: '5px', fontSize: '12px' }}>
                          {avail.startDate} - {avail.endDate} 
                          <br></br>$<b>{avail.price}</b>
                          </p>
                        ))}
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