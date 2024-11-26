import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, Input, Button, message, List, Col, Card, Row, Divider } from 'antd';
import moment from 'moment';
import { cancelAccepted, cancelPending } from '../../services/reservationService';

const HostCalendar = ({ availability, reservations }) => {
  
  const [availabilityList, setAvailabilityList] = useState(availability);
  const [selectedDates, setSelectedDates] = useState({ start: null, end: null });
  const [temporaryHighlight, setTemporaryHighlight] = useState([]);
  const [pricePerDay, setPricePerDay] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddingAvailability, setIsAddingAvailability] = useState(false);
  const [updatedReservations, setUpdatedReservations] = useState(reservations);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isManageModalVisible, setIsManageModalVisible] = useState(false)

  const availabilityEvents = availabilityList.map((avail) => ({
    start: avail.startDate,
    end: avail.endDate,
    display: 'background',
    backgroundColor: 'green',
    borderColor: 'green',
    title: `$${avail.price.toFixed(2)}`,
    textColor: 'black',
  }));

  const reservationEvents = updatedReservations.map((reservation) => ({
    start: reservation.startDate,
    end: reservation.endDate,
    title: `${reservation.status} Reservation`,
    backgroundColor: reservation.status === 'Accepted' ? 'green' : 'red',
    textColor: 'white',
    borderColor: reservation.status === 'Accepted' ? 'darkred' : 'darkgray',
  }));

  const handleDateClick = (info) => {
    if (!isAddingAvailability) return;

    const clickedDate = info.dateStr;

    if (!selectedDates.start) {
      setSelectedDates({ start: clickedDate, end: null });
      setTemporaryHighlight([
        {
          start: clickedDate,
          end: clickedDate,
          display: 'background',
          backgroundColor: 'blue',
          borderColor: 'blue',
        },
      ]);
    } else if (!selectedDates.end) {
      if (new Date(clickedDate) < new Date(selectedDates.start)) {
        message.error('End date must be after the start date.');
        return;
      }

      const overlap = checkAvailabilityOverlap(selectedDates.start, clickedDate);
      if (overlap) {
        message.error('The selected dates overlap with existing availability.');
        return;
      }

      setSelectedDates({ ...selectedDates, end: clickedDate });
      const range = generateDateRange(selectedDates.start, clickedDate);
      setTemporaryHighlight(
        range.map((date) => ({
          start: date,
          end: date,
          display: 'background',
          backgroundColor: 'blue',
          borderColor: 'blue',
        }))
      );
      setIsModalVisible(true);
    }
  };

  const generateDateRange = (start, end) => {
    const range = [];
    let currentDate = new Date(start);

    while (currentDate <= new Date(end)) {
      range.push(new Date(currentDate).toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return range;
  };

  // Reservations logic

  const sortedReservations = [...updatedReservations].sort((a, b) => {
    if (a.status === 'Pending' && b.status !== 'Pending') return -1;
    if (a.status !== 'Pending' && b.status === 'Pending') return 1;
    return 0;
  });

  const handleManageReservation = (reservation) => {
    setSelectedReservation(reservation);
    setIsManageModalVisible(true);
  };

  const handleAcceptReservation = async (id) => {
    if (!id) {
        message.error("Reservation ID is missing. Cannot proceed with acceptance.");
        return;
    }

    // try {
    //     const response = await apiClient.post(`/reservation/accept/${id}`);
    //     message.success(`Reservation from ${selectedReservation.startDate} to ${selectedReservation.endDate} has been accepted.`);
    //     setIsManageModalVisible(false);
    // } catch (error) {
    //     message.error("Failed to accept the reservation. Please try again.");
    //     console.error(error);
    // }
    };

  const handleRejectReservation = async (id) => {
    if (!id) {
        message.error("Reservation ID is missing. Cannot proceed with rejection.");
        return;
    }
    try {
        const response = await cancelPending(id); 
        message.success(`Reservation from ${selectedReservation.startDate} to ${selectedReservation.endDate} has been rejected.`);

        setIsManageModalVisible(false);
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
        message.success(`Reservation from ${selectedReservation.startDate} to ${selectedReservation.endDate} has been rejected.`);
        setIsManageModalVisible(false);
    } catch (error) {
        message.error("Failed to reject the reservation. Please try again.");
        console.error(error);
    }
    };
  
  const handleCloseModal = () => {
    setIsManageModalVisible(false);
  };

  // Availability logic

  const checkAvailabilityOverlap = (start, end) => {
    const selectedRange = generateDateRange(start, end);
    return availabilityList.some((avail) => {
      const availabilityRange = generateDateRange(avail.startDate, avail.endDate);
      return selectedRange.some((date) => availabilityRange.includes(date));
    });
  };

  const handleAddAvailability = () => {
    if (!pricePerDay || isNaN(pricePerDay) || pricePerDay <= 0) {
      message.error('Please enter a valid price.');
      return;
    }

    const newAvailability = {
      startDate: selectedDates.start,
      endDate: selectedDates.end,
      price: parseFloat(pricePerDay),
    };

    setAvailabilityList([...availabilityList, newAvailability]);
    setTemporaryHighlight([]);
    setSelectedDates({ start: null, end: null });
    setPricePerDay('');
    setIsModalVisible(false);

    message.success('Availability added successfully!');
  };

  const handleRemoveAvailability = (index) => {
    const availabilityToRemove = availabilityList[index];

    const updatedList = availabilityList.filter((_, i) => i !== index);
    setAvailabilityList(updatedList);
    const filteredReservations = updatedReservations.filter((reservation) => {
      const reservationRange = generateDateRange(reservation.startDate, reservation.endDate);
      const availabilityRange = generateDateRange(availabilityToRemove.startDate, availabilityToRemove.endDate);
      return !reservationRange.some((date) => availabilityRange.includes(date)) || reservation.status !== 'Pending';
    });

    setUpdatedReservations(filteredReservations);

    message.success('Availability and pending reservations removed in deleted timeframe.');
  };

  const handleSaveAvailabilities = () => {
    message.success('Availabilities saved!');
  };

  const events = [...availabilityEvents, ...reservationEvents, ...temporaryHighlight];

  return (
    <div style={{ margin: '20px' }}>
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        {/* Calendar Section */}
        <Col xs={22} sm={12}>
          <Card title="Reservation" style={{ width: '100%' }}>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              dateClick={handleDateClick}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek',
              }}
              eventContent={(eventInfo) => (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    textAlign: 'center',
                    color: eventInfo.event.extendedProps.textColor || 'black',
                  }}
                >
                  {eventInfo.event.title}
                </div>
              )}
            />
          </Card>
        </Col>

        {/* Availability List Section */}
        <Col xs={24} sm={12}>
          <Card title="Current Availabilities" style={{ width: '100%' }}>
            <div style={{ marginTop: '20px' }}>
              <Button
                type="primary"
                style={{
                  backgroundColor: 'green',
                  borderColor: 'green',
                  marginBottom: '20px',
                  textAlign: 'center',
                }}
                onClick={() => {
                  setSelectedDates({ start: null, end: null });
                  setTemporaryHighlight([]);
                  setIsAddingAvailability(true);
                  message.info('Select a start and end date for availability.');
                }}
              >
                Add New Availability
              </Button>
              <Divider />
              <List
                dataSource={availabilityList}
                renderItem={(item, index) => (
                    <List.Item
                    actions={[
                        <Button
                        type="link"
                        style={{
                            color: 'red',
                            borderRadius: '50%',
                            border: '2px solid red',
                            width: '30px',
                            height: '30px',
                            lineHeight: '28px',
                            textAlign: 'center',
                        }}
                        onClick={() => handleRemoveAvailability(index)}
                        >
                        X
                        </Button>,
                    ]}
                    >
                    {`${moment(item.startDate).format('DD.MM.YYYY')} - ${moment(item.endDate).format('DD.MM.YYYY')}: $${item.price.toFixed(2)}`}
                    </List.Item>
                )}
                />
               <Button
                type="primary"
                style={{ backgroundColor: 'green', borderColor: 'green', marginTop: '20px' }}
                onClick={handleSaveAvailabilities}
              >
                Save New Availabilities
              </Button>
              <Divider>Reservations</Divider>
              <List
                dataSource={sortedReservations}
                renderItem={(item) => (
                    <List.Item
                    style={{
                        border: item.status === 'Pending' ? '2px solid gold' : 'none',
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
      </Row>

      <Modal
        title="Set Price Per Day"
        visible={isModalVisible}
        onOk={handleAddAvailability}
        onCancel={() => {
          setIsModalVisible(false);
          setTemporaryHighlight([]);
          setSelectedDates({ start: null, end: null });
        }}
      >
        <Input
          placeholder="Enter price per day"
          value={pricePerDay}
          onChange={(e) => setPricePerDay(e.target.value)}
          type="number"
        />
      </Modal>

        {/* Manage Reservation Modal */}
        <Modal
            title="Manage Reservation"
            visible={isManageModalVisible}
            onCancel={handleCloseModal}
            footer={null} 
            width={500}
        >
            <Row>
            <Col span={24}>
                <Card>
                <div>
                    <p><strong>Reservation ID:</strong> {selectedReservation?.id}</p>
                    <p><strong>Start Date:</strong> {selectedReservation?.startDate}</p>
                    <p><strong>End Date:</strong> {selectedReservation?.endDate}</p>
                    <p
                        style={{
                            color: selectedReservation?.status === 'Accepted' ? 'green' : selectedReservation?.status === 'Pending' ? 'red' : 'black',
                        }}
                        >
                        <strong>Status:</strong> {selectedReservation?.status}
                    </p>
                    <p><strong>Price:</strong> ${selectedReservation?.price}</p>
                </div>
                </Card>
            </Col>
            </Row>

            <Divider />

            {/* Action Buttons */}
            <Row justify="end">
                {selectedReservation?.status === 'Pending' ? (
                    <>
                    <Button
                        type="primary"
                        style={{ backgroundColor: 'green', borderColor: 'green', marginRight: '10px' }}
                        onClick={() => handleAcceptReservation(selectedReservation.id)}
                    >
                        Accept
                    </Button>
                    <Button
                        type="danger"
                        style={{ backgroundColor: 'red', borderColor: 'red', marginRight: '10px', color: 'white' }}
                        onClick={() => handleRejectReservation(selectedReservation.id)}
                    >
                        Reject
                    </Button>
                    </>
                ) : (
                    <Button
                    type="danger"
                    style={{ backgroundColor: 'red', borderColor: 'red', marginRight: '10px', color: 'white' }}
                    onClick={() => handleRejectAcceptedReservation(selectedReservation.id)}
                    >
                    Reject
                    </Button>
                )}
                <Button onClick={handleCloseModal}>Close</Button>
            </Row>
        </Modal>
    </div>
  );
};

export default HostCalendar;
