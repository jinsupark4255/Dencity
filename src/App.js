import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './contents/mainpage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
