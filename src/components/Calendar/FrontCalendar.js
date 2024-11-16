
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
//import '@fullcalendar/daygrid/main.css';

const FrontCalendar = ( {availability, reservations} ) => {

  const availabilityEvents = availability.flatMap(avail => ({
    start: avail.startDate,
    end: avail.endDate,
    display: 'background',
    backgroundColor: 'green',
    borderColor: 'green',
    title: avail.price && !isNaN(avail.price) ? `$${avail.price.toFixed(2)}` : 'N/A', 
    textColor: 'black',
  }));

  const reservationEvents = reservations.map(reservation => ({
    start: reservation.startDate,
    end: reservation.endDate, 
    title: `${reservation.status} Reservation`,
    backgroundColor: reservation.status === 'Accepted' ? 'red' : 'gray',
    textColor: 'white',
    borderColor: reservation.status === 'Accepted' ? 'darkred' : 'darkgray',
  }));

  const events = [...availabilityEvents, ...reservationEvents];

  // Center and clean the text up in the event
  const renderEventContent = (eventInfo) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
        color: eventInfo.event.extendedProps.textColor || 'black',
        backgroundColor: eventInfo.event.extendedProps.backgroundColor || 'transparent',
      }}
    >
      {eventInfo.event.title}
    </div>
  );

  return (
    <div style={{ margin: '20px' }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  );
};
export default FrontCalendar;
