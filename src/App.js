import React from 'react';
import { AuthProvider } from './contents/AuthContext'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './contents/mainpage';
import Mypage from './contents/mypagecom';
import KakaoLogin from './contents/kakaoLogin';
import Profile from './contents/profile';
import KakaoCallback from './contents/KakaoCallback';
import { UserContextProvider } from "./contents/UserContext";

function App() {
  return (
    <UserContextProvider>
<AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<KakaoLogin />} />
          <Route path="/oauth/callback/kakao" element={<KakaoCallback />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/mypage" element ={<Mypage/>}/>
        </Routes>
      </Router>
    </AuthProvider>
    </UserContextProvider>
    
  );
}
export default App;