
import './App.css';
import Header from './components/header/header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RandomHomeImageComponent from './components/home-image/random-home-image';
import Register from './components/register/register';
import Login from './components/login/login';
import { useState } from 'react';

function App() {

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


    </div>
  );
}

export default App;
