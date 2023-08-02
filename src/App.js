import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './contents/mainpage';
import KakaoLogin from './contents/kakaoLogin';
import Profile from './contents/profile';
import { UserProvider } from './contents/UserContext';

function App() {
  return (
    <UserProvider>
<Router>
      <Routes>
        <Route path="/" element={ <KakaoLogin/>} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
    </UserProvider>
    
  );
}

export default App;
