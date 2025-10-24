
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const FrontCalendar = ( {availability, reservations, onDatesSelected} ) => {

  const [selectedDates, setSelectedDates] = useState({ start: null, end: null });
  const [temporaryHighlight, setTemporaryHighlight] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [warning, setWarning] = useState(null);

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

  // Check if user can select dates that he wants
  const validateRange = (range) => {
    let hasPending = false;

    for (const date of range) {
      const isAccepted = reservations.some(reservation =>
        new Date(date) >= new Date(reservation.startDate) &&
        new Date(date) <= new Date(reservation.endDate) &&
        reservation.status === 'Accepted'
      );

      if (isAccepted) return { isValid: false, hasPending: false };

      const isPending = reservations.some(reservation =>
        new Date(date) >= new Date(reservation.startDate) &&
        new Date(date) <= new Date(reservation.endDate) &&
        reservation.status === 'Pending'
      );

      if (isPending) hasPending = true;
    }

    return { isValid: true, hasPending };
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

  // Handle date click
  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;

    if (!selectedDates.start) {
      // First click: Highlight the start date
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
      setError(null);
      setSuccess(null); // Clear previous success message
      setWarning(null); // Clear previous warnings
    } else if (!selectedDates.end) {
      // Second click: Validate and set the range
      if (new Date(clickedDate) < new Date(selectedDates.start)) {
        setError('End date must be after the start date.');
        setSelectedDates({ start: null, end: null });
        setTemporaryHighlight([]);
        setSuccess(null);
        setWarning(null);
        return;
      }

      const range = generateDateRange(selectedDates.start, clickedDate);
      const validation = validateRange(range);

      if (validation.isValid) {
        setSelectedDates({ ...selectedDates, end: clickedDate });
        setTemporaryHighlight(
          range.map(date => ({
            start: date,
            end: date,
            display: 'background',
            backgroundColor: 'blue',
            borderColor: 'blue',
          }))
        );
        setError(null);
        setWarning(validation.hasPending ? 'Your reservation may not be accepted due to pending reservations.' : null);
        if (onDatesSelected) {
          onDatesSelected({ start: selectedDates.start, end: clickedDate });
        }
      } else {
        setError('Invalid selection: Conflicts with accepted reservations.');
        setSelectedDates({ start: null, end: null });
        setTemporaryHighlight([]);
        setSuccess(null);
        setWarning(null);
      }
    } else {
      // Reset selection if both start and end are already set
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
      setError(null);
      setSuccess(null);
      setWarning(null);
    }
  };

  const events = [...availabilityEvents, ...reservationEvents, ...temporaryHighlight];

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
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      {success && <p style={{ color: 'green', marginBottom: '10px' }}>{success}</p>}
      {warning && <p style={{ color: 'orange', marginBottom: '10px' }}>{warning}</p>}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]} 
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick} 
        eventContent={(eventInfo) => (
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
        )}
      />
      {selectedDates.start && !selectedDates.end && (
        <p style={{ marginTop: '20px' }}>Start Date: {selectedDates.start}</p>
      )}
      {selectedDates.start && selectedDates.end && (
        <p style={{ marginTop: '20px' }}>
          Selected Dates: {selectedDates.start} to {selectedDates.end}
        </p>
      )}
    </div>
  );
};
export default FrontCalendar;
