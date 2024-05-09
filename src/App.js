
import './App.css';
import Header from './components/header/header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RandomHomeImageComponent from './components/home-image/random-home-image';
import Register from './components/register/register';

function App() {
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
      </Routes>
    </Router>


    </div>
  );
}

export default App;
