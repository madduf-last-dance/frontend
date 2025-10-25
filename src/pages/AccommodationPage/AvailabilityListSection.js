import { Divider, List, Layout, Card, Row, Col, Button, Modal, Typography, Carousel, message } from 'antd';
import moment, { updateLocale } from 'moment';
import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import {generateDateRange} from '../../utils/dateUtils';
import { saveAvalabilities } from '../../services/accommodationService';

const AvailabilityListSection = ({ state, dispatch }) => {

  const [selectedReservation, setSelectedReservation] = useState(null);


const handleManageReservation = (reservation) => {

  dispatch({ type: 'isManageModalVisible', 
    payload: { ...state,
    isManageModalVisible: true,
  }});
  dispatch({ type: 'selectedReservation', 
    payload: { ...state,
      selectedReservation: reservation,
  }});
};



const handleRemoveAvailability = (index) => {
    const availabilityToRemove = state.availabilityList[index];

    const updatedList = state.availabilityList.filter((_, i) => i !== index);
    // setAvailabilityList(updatedList);
    const filteredReservations = state.reservations.filter((reservation) => {
      const reservationRange = generateDateRange(reservation.startDate, reservation.endDate);
      const availabilityRange = generateDateRange(availabilityToRemove.startDate, availabilityToRemove.endDate);
      return !reservationRange.some((date) => availabilityRange.includes(date)) || reservation.status !== 'Pending';
    });

    // setReservations(filteredReservations);

    message.success('Availability and pending reservations removed in deleted timeframe.');
  };
  const handleSaveAvailabilities = async () => {
    try {
      const response = await saveAvalabilities(state.accommodationId, state.availabilityList);
      message.success('Availabilities saved successfully!');
      console.log('Backend response:', response);

      // Optionally refresh state or fetch updated availabilities here
      // dispatch({ type: 'availabilityList', payload: response.updatedAvailabilities });
    } catch (error) {
      console.error('Error saving availabilities:', error);

      // Backend error structure (from Nest)
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Failed to save availabilities. Please try again.';

      message.error(backendMessage);
    }
  };

  function handleAddTask() {
    // dispatch({
    //   type: 'manageModalVisible',
    //   isManageModalVisible: true,
    // });
  }
return (
  <Col xs={24} sm={12}>
        <Card style={{ width: '100%' }}>
          <div style={{ marginTop: '20px' }}>
            <Divider>Availabilities</Divider>
            <List
              style={{
                overflowY: 'auto', // Enable vertical scrolling
                maxHeight: 400,
              }}
              dataSource={state.availabilityList}
              renderItem={(item, index) => (
                  <List.Item
                  actions={[
                      <Button
                      type="link"
                      style={{
                          color: 'black',
                          borderRadius: '50%',
                          width: '30px',
                          height: '30px',
                          lineHeight: '28px',
                          textAlign: 'center',
                      }}
                      onClick={() => handleRemoveAvailability(index)}
                      >
                      <CloseOutlined />
                      </Button>,
                  ]}
                  >
                  {`${moment(item.startDate).format('DD.MM.YYYY')} - ${moment(item.endDate).format('DD.MM.YYYY')}: $${item.price.toFixed(2)}`}
                  </List.Item>
              )}
              />
              <Button
                type="primary"
                disabled={state.isAddingAvailability}
                style={{
                  backgroundColor: 'green',
                  borderColor: 'green',
                  marginRight: '5px',
                  textAlign: 'center',
                }}
                      onClick={() => {
                dispatch({ type: 'selectedDates', 
                  payload: { selectedDates: { start: null, end: null } }});
                dispatch({ type: 'temporaryHighlight', 
                  payload: { temporaryHighlight: [] }});
                dispatch({ type: 'isAddingAvailability', 
                  payload: { isAddingAvailability: true }});
                message.info('Select a start and end date for availability.');
              }}>
              {state.isAddingAvailability ? "Adding..." : "Add Availability"}
            </Button>
            <Button
              type="primary"
              style={{ backgroundColor: 'green', borderColor: 'green', marginTop: '20px'}}
              onClick={handleSaveAvailabilities}
            >
              Save New Availabilities
            </Button>
            {/* <Button onClick={handleAddTask}>Test</Button> */}
            <Divider>Reservations</Divider>
            <List
              dataSource={state.reservations}
              style={{
                overflowY: 'auto', // Enable vertical scrolling
                maxHeight: 400,
              }}
              renderItem={(item) => (
                  <List.Item
                  style={{
                      border: item.status === 'Pending' ? '1px solid red' : 'none',
                      borderRadius: '5px',
                  }}
                  actions={[
                      <Button
                      type="primary"
                      onClick={() => handleManageReservation(item)}
                      >
                      View
                      </Button>,
                  ]}
                  >
                  {/* Ensure you're accessing the properties correctly */}
                  <div style={{ color: item.status === 'Pending' ? 'red' : 'black' , marginLeft: '7px'}}>
                      {item.status === 'Pending'
                      ? `Reservation for ${moment(item.startDate).format('DD.MM.YYYY')} is still pending`
                      : `Reservation from ${moment(item.startDate).format('DD.MM.YYYY')} to ${moment(item.endDate).format('DD.MM.YYYY')}: ${item.status}`}
                  </div>
              </List.Item>
              )}
          />
          </div>
        </Card>
</Col>
)
}

export default AvailabilityListSection;
