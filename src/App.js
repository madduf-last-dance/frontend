
import './App.css';
import Header from './components/header/header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RandomHomeImageComponent from './components/home-image/random-home-image';
import Register from './components/register/register';
import Login from './components/login/login';
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const events = [
  { title: 'Meeting', start: new Date() }
]


function App() {
  function handleDateSelect(selectInfo) {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: 123,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  const [accessToken, setAccessToken] = useState('')


  return (
    <div className="App">


    <Router>
      <Routes>
          <Route
            path="/"
            element={
              <div>
                <Header></Header>
                <RandomHomeImageComponent/>
           
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div>
                <Header></Header>
                <Register/>
           
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <Login setAccessToken={setAccessToken}></Login>
            }
          >
          </Route>
      </Routes>
    </Router>
    <div>
      <h1>Demo App</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        editable={true}
        selectable={true}
        initialView='dayGridMonth'
        weekends={false}
        events={events}
        select={handleDateSelect}
        eventContent={renderEventContent}
      />
    </div>


    </div>
  );
}
//
// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

export default App;
