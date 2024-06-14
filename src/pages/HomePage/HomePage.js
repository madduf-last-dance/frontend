import SearchBar from '../../components/SearchBar/SearchBar';
import Navbar from '../../components/Navbar/Navbar';

import { useNavigate } from 'react-router-dom';
import { Layout, Row, Col, Card } from 'antd';

const { Meta } = Card;
const { Content } = Layout;

const hotels = [
    {
      id: 1,
      name: 'Hotel California',
      description: 'A lovely place, with great amenities and a wonderful view.',
      img: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE2MjI1MjI0NDQ0MzYzMjM4Mg%3D%3D/original/ae3426d1-fba4-44d4-bed2-690426f25f7a.jpeg?im_w=1440&im_q=highq',
    },
    {
      id: 2,
      name: 'The Grand Budapest Hotel',
      description: 'An exquisite hotel with old-world charm and modern facilities.',
      img: 'https://via.placeholder.com/300',
    },
    {
      id: 3,
      name: 'Hotel Transylvania',
      description: 'A spooky yet comfortable place to stay with family and friends.',
      img: 'https://via.placeholder.com/300',
    },
    // Add more hotel data as needed
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
                        <Card
                            hoverable
                            cover={<img alt={hotel.name} src={hotel.img} />}
                            onClick={ () => handleCardClick(hotel.id) }
                        >
                            <Meta title={hotel.name} description={hotel.description} />
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