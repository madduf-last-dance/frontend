import logo from './logo.svg';
import './App.css';
import Header from './components/header/header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RandomHomeImageComponent from './components/home-image/random-home-image';
import p1 from './components/home-image/home-images/p1.jpg';

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
      </Routes>
    </Router>


    </div>
  );
}

export default App;
