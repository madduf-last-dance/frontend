import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Card, Carousel, List } from 'antd';
import Navbar from '../../components/Navbar/Navbar';

const { Content } = Layout;

const hotels = [
    {
      id: 1,
      name: 'Hotel California',
      description: 'A lovely place, with great amenities and a wonderful view.',
      location: 'Los Angeles, CA',
      amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Free Parking'],
      photos: ['https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE2MjI1MjI0NDQ0MzYzMjM4Mg%3D%3D/original/ae3426d1-fba4-44d4-bed2-690426f25f7a.jpeg?im_w=1440&im_q=highq', 'https://via.placeholder.com/300', 'https://via.placeholder.com/300'],
      minGuests: 1,
      maxGuests: 4,
    },
    {
      id: 2,
      name: 'The Grand Budapest Hotel',
      description: 'An exquisite hotel with old-world charm and modern facilities.',
      location: 'Budapest, Hungary',
      amenities: ['WiFi', 'Restaurant', 'Spa', 'Concierge'],
      photos: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300', 'https://via.placeholder.com/300'],
      minGuests: 1,
      maxGuests: 2,
    },
    {
      id: 3,
      name: 'Hotel Transylvania',
      description: 'A spooky yet comfortable place to stay with family and friends.',
      location: 'Transylvania, Romania',
      amenities: ['WiFi', 'Swimming Pool', 'Gym', 'Free Parking'],
      photos: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300', 'https://via.placeholder.com/300'],
      minGuests: 1,
      maxGuests: 6,
    },
    // Add more hotel data as needed
  ];

const HotelDetailPage = () => {
    const { id } = useParams();
    const hotel = hotels.find(hotel => hotel.id === parseInt(id));
  
    if (!hotel) {
      return <div>Hotel not found</div>;
    }
  
    return (
      <>
        <Navbar />
        <Content style={{ padding: '0 120px', marginTop: "42px"}}>
        <Card
          title={hotel.name}
          bordered={false}
          style={{ maxWidth: 600, width: '100%' }} // Set max-width and full width
        >
            <Carousel autoplay>
            {hotel.photos.map((photo, index) => (
                <div key={index}>
                <img src={photo} alt={`Hotel ${index}`} style={{ width: '100%' }} />
                </div>
            ))}
            </Carousel>
            <p>{hotel.description}</p>
            <p><strong>Location:</strong> {hotel.location}</p>
            <p><strong>Amenities:</strong></p>
            <List
            dataSource={hotel.amenities}
            renderItem={item => (
                <List.Item>
                {item}
                </List.Item>
            )}
            />
            <p><strong>Guests:</strong> {hotel.minGuests} - {hotel.maxGuests}</p>
        </Card>
      </Content>
      </>
    );
  };
  
  export default HotelDetailPage;