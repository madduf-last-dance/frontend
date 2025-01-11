import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { message, Card } from 'antd';
import {increaseDateByOneDay, generateDateRange} from '../../utils/dateUtils';


const HostCalendar = ({ state, dispatch }) => {
  const availabilityEvents = state.availabilityList.map((avail) => ({
    start: avail.startDate,
    end: increaseDateByOneDay(avail.endDate),
    display: 'background',
    backgroundColor: 'green',
    borderColor: 'green',
    title: `$${avail.price.toFixed(2)}`,
    textColor: 'black',
  }));

  const reservationEvents = state.reservations.map((reservation) => ({
    start: reservation.startDate,
    end: reservation.endDate,
    title: `${reservation.status} Reservation`,
    backgroundColor: reservation.status === 'Accepted' ? 'green' : 'red',
    borderColor: 'transparent',
    textColor: 'white',
    status: reservation.status,
    reservationObj: reservation
  }));

  const handleDateClick = (info) => {
    if (!state.isAddingAvailability) return;

    const clickedDate = info.dateStr;

    if (!state.selectedDates.start) {
      dispatch({ type: 'selectedDates', 
        payload: { selectedDates: { start: clickedDate, end: null } }});
      dispatch({ type: 'temporaryHighlight', 
        payload: { temporaryHighlight: [
          {
            start: clickedDate,
            end: clickedDate,
            display: 'background',
            backgroundColor: 'blue',
            borderColor: 'blue',
          },
        ] }});
    } else if (!state.selectedDates.end) {
      if (new Date(clickedDate) < new Date(state.selectedDates.start)) {
        message.error('End date must be after the start date.');
        return;
      }

      const overlap = checkAvailabilityOverlap(state.selectedDates.start, clickedDate);
      if (overlap) {
        message.error('The selected dates overlap with existing availability.');
        return;
      }

      dispatch({ type: 'selectedDates', 
        payload: { selectedDates: { ...state.selectedDates, end: clickedDate }}});
      const range = generateDateRange(state.selectedDates.start, clickedDate);
      dispatch({ type: 'temporaryHighlight', 
        payload: { temporaryHighlight: 
          range.map((date) => ({
            start: date,
            end: date,
            display: 'background',
            backgroundColor: 'blue',
            borderColor: 'blue',
          }))
        }
      });
      dispatch({ type: 'isModalVisible', 
        payload: { isModalVisible: true }});
    }
  };

  // Availability logic

  const checkAvailabilityOverlap = (start, end) => {
    const selectedRange = generateDateRange(start, end);
    return state.availabilityList.some((avail) => {
      const availabilityRange = generateDateRange(avail.startDate, avail.endDate);
      return selectedRange.some((date) => availabilityRange.includes(date));
    });
  };

  const handleReservationClick = (info) => {
    var eventObj = info.event.extendedProps;
    if(eventObj.status) {
      dispatch({ type: 'isManageModalVisible', 
        payload: { ...state,
        isManageModalVisible: true,
      }});
      dispatch({ type: 'selectedReservation', 
        payload: { ...state,
          selectedReservation: eventObj.reservationObj,
      }});
    }

  }

  const events = [...availabilityEvents, ...reservationEvents, ...state.temporaryHighlight];

  return (
    <Card style={{ width: '100%' }}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleReservationClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth',
        }}
        eventContent={(eventInfo) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              color: eventInfo.event.textColor || 'black',
            }}
          >
            {eventInfo.event.title}
          </div>
        )}
      />
    </Card>
  );
};

export default HostCalendar;
