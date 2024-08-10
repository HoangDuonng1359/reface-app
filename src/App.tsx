import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HomePage } from './page/HomePage';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { Reface } from './page/Reface';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage></HomePage>}></Route>
          <Route path='/reface' element={<Reface></Reface>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
