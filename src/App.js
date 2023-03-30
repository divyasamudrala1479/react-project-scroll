import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import Cookies from "js-cookie"
import './App.css';

function App() {
  const isLoggedIn = !!Cookies.get('username'); 
  console.log(isLoggedIn);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          {/* <Route exact path="/home" element={isLoggedIn ? <HomePage /> : <LoginPage />} />*/ }
          <Route exact path="/home" element={<HomePage />} />
          <Route path="*" element={isLoggedIn ? <HomePage /> : <LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;