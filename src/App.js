import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './contents/map';  // Map 컴포넌트를 가져옵니다.

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;
