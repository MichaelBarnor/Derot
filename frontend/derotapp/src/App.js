import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Quote   from './quote';
import Timer   from './timer';
import Summary from './summary';
import  './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"       element={<Quote />} />
        <Route path="/timer"  element={<Timer />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
