import React, { useState, useEffect, useReducer } from 'react';
import { Layout, Card, Row, Col, Button, Modal, Typography,Input, Carousel,Divider, message } from 'antd';
import Navbar from '../../components/Navbar/Navbar';
import { allHotelsHost, create, findById, update } from '../../services/accommodationService';
import { useParams } from 'react-router-dom';
import { acceptReservation, accommodationReservations,cancelAccepted,cancelPending } from '../../services/reservationService';
import HostCalendar from '../../components/Calendar/HostCalendar';
import AvailabilityListSection from './AvailabilityListSection';
import accommodationPageReducer from './reducer';

const { Content } = Layout;
const { Title } = Typography;

const AccommodationPage = () => {
  const {accommodationId } = useParams();

  const initialState = {
    accommodation: null,
    isModalVisible: false,
    temporaryHighlight: [],
    isAddingAvailability: false,
    reservations: [],
    pricePerDay: '',
    selectedDates: { start: null, end: null },
    availabilityList: null,
    isManageModalVisible: false,
    selectedReservation: null,
    accommodationId: accommodationId,
  }
  const [state, dispatch] = useReducer(
    accommodationPageReducer, initialState
  )
  useEffect(() => {
    if (accommodationId) {
      findById(accommodationId)
        .then((data) => {
          dispatch({ type: 'accommodation', 
            payload: { ...state,
            accommodation: data,
            availabilityList: data.availability
          }});
        })
        .catch((error) => {
          console.error("Failed to fetch accommodation:", error);
        });
      accommodationReservations(accommodationId).then(data => {
        console.log("Fetched Reservations for this accommodation:", data);
        dispatch({ type: 'reservation', 
          payload: { ...state,
          reservations: data,
        }});
      });
    }
  }, [accommodationId]);

  const handleAddAvailability = () => {
    if (!state.pricePerDay || isNaN(state.pricePerDay) || state.pricePerDay <= 0) {
      message.error('Please enter a valid price.');
      return;
    }

    var endDate = new Date(state.selectedDates.end);
    endDate.setDate(endDate.getDate() + 1);
    const formattedDate = endDate.toISOString().split('T')[0];
    const newAvailability = {
      startDate: state.selectedDates.start,
      endDate: formattedDate,
      price: parseFloat(state.pricePerDay),
    };
    dispatch({ type: 'availabilityList', 
      payload: {
        availabilityList: [...state.availabilityList, newAvailability],
    }});
    dispatch({ type: 'temporaryHighlight', 
      payload: { temporaryHighlight: [] }});
    dispatch({ type: 'selectedDates', 
        payload: { selectedDates: { start: null, end: null } }});
    dispatch({ type: 'pricePerDay', 
      payload: { pricePerDay: '' }});
    dispatch({ type: 'isModalVisible', 
      payload: { isModalVisible: false }});
    message.success('Availability added successfully!');
  };

  const handleCloseModal = () => {
    dispatch({ type: 'isModalVisible', 
      payload: { isModalVisible: false }});
  };

  const handleCloseManageModal = () => {
    dispatch({ type: 'isManageModalVisible', 
      payload: { isModalVisible: false }});
  };

  const handleRejectReservation = async (id) => {
    if (!id) {
        message.error("Reservation ID is missing. Cannot proceed with rejection.");
        return;
    }
    try {
        const response = await cancelPending(id); 
        message.success(`Reservation from ${state.selectedReservation.startDate} to ${state.selectedReservation.endDate} has been rejected.`);

        dispatch({ type: 'isManageModalVisible', 
          payload: { isManageModalVisible: false }});
    } catch (error) {
        message.error("Failed to reject the reservation. Please try again.");
        console.error(error);
    }
    };

  const handleRejectAcceptedReservation = async (id) => {
    if (!id) {
        message.error("Reservation ID is missing. Cannot proceed with rejection.");
        return;
    }

    try {
        const response = await cancelAccepted(id); 
        message.success(`Reservation from ${state.selectedReservation.startDate} to ${state.selectedReservation.endDate} has been rejected.`);
        dispatch({ type: 'isManageModalVisible', 
          payload: { isManageModalVisible: false }});
    } catch (error) {
        message.error("Failed to reject the reservation. Please try again.");
        console.error(error);
    }
  };
  

  const handleAcceptReservation = async (id) => {
    if (!id) {
        message.error("Reservation ID is missing. Cannot proceed with acceptance.");
        return;
    }

    try {
        const response = await acceptReservation(id);
        message.success(`Reservation from ${state.selectedReservation.startDate} to ${state.selectedReservation.endDate} has been accepted.`);
        dispatch({ type: 'isManageModalVisible', 
          payload: { isManageModalVisible: false }});
    } catch (error) {
        message.error("Failed to accept the reservation. Please try again.");
        console.error(error);
    }
    };



  // Display a loading message while the accommodation is being fetched
  if (!state.accommodation) {
    return (
      <>
        <Navbar />
        <Content style={{ padding: '0 120px', marginTop: '42px' }}>
          <Title level={2}>Loading accommodation details...</Title>
        </Content>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Content style={{ padding: '0 120px', marginTop: '42px' }}>
        <Title level={2} style={{ textAlign: 'center' }}>{state.accommodation.name} in {state.accommodation.location}</Title>
      </Content>
      <div style={{ margin: '20px' }}>
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          {/* Calendar Section */}
          <Col xs={22} sm={12}>
            <HostCalendar
              state={state}
              dispatch={dispatch}
            >
            </HostCalendar>
          </Col>
          <AvailabilityListSection 
              state={state}
              dispatch={dispatch}
          >
          </AvailabilityListSection>
        </Row>
      <Modal
        title="Set Price Per Day"
        visible={state.isModalVisible}
        onOk={handleAddAvailability}
        onCancel={() => {
          dispatch({ type: 'isModalVisible', 
            payload: { isModalVisible: false }});
          dispatch({ type: 'temporaryHighlight', 
            payload: { temporaryHighlight: [] }});
          dispatch({ type: 'selectedDates', 
            payload: { selectedDates: { start: null, end: null } }});
        }}
      >
        <Input
          placeholder="Enter price per day"
          value={state.pricePerDay}
          onChange={(e) => dispatch({ type: 'pricePerDay', 
            payload: { pricePerDay: e.target.value }})}
          type="number"
        />
      </Modal>

        {/* Manage Reservation Modal */}
        <Modal
            title="Manage Reservation"
            visible={state.isManageModalVisible}
            onCancel={handleCloseManageModal}
            footer={null} 
            width={500}
        >
            <Row>
            <Col span={24}>
                <Card>
                <div>
                    <p><strong>Reservation ID:</strong> {state.selectedReservation?.id}</p>
                    <p><strong>Start Date:</strong> {state.selectedReservation?.startDate}</p>
                    <p><strong>End Date:</strong> {state.selectedReservation?.endDate}</p>
                    <p
                        style={{
                            color: state.selectedReservation?.status === 'Accepted' ? 'green' : state.selectedReservation?.status === 'Pending' ? 'red' : 'black',
                        }}
                        >
                        <strong>Status:</strong> {state.selectedReservation?.status}
                    </p>
                    <p><strong>Price:</strong> ${state.selectedReservation?.price}</p>
                </div>
                </Card>
            </Col>
            </Row>

            <Divider />

            {/* Action Buttons */}
            <Row justify="end">
                {state.selectedReservation?.status === 'Pending' ? (
                    <>
                    <Button
                        type="primary"
                        style={{ backgroundColor: 'green', borderColor: 'green', marginRight: '10px' }}
                        onClick={() => handleAcceptReservation(state.selectedReservation.id)}
                    >
                        Accept
                    </Button>
                    <Button
                        type="danger"
                        style={{ backgroundColor: 'red', borderColor: 'red', marginRight: '10px', color: 'white' }}
                        onClick={() => handleRejectReservation(state.selectedReservation.id)}
                    >
                        Reject
                    </Button>
                    </>
                ) : (
                    <Button
                    type="danger"
                    style={{ backgroundColor: 'red', borderColor: 'red', marginRight: '10px', color: 'white' }}
                    onClick={() => handleRejectAcceptedReservation(state.selectedReservation.id)}
                    >
                    Reject
                    </Button>
                )}
                {/* <Button onClick={handleCloseModal}>Close</Button> */}
            </Row>
        </Modal>
      </div>
    </>
  );
};

export default AccommodationPage;
