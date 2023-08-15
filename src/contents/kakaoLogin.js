import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 'useNavigate'를 가져옵니다.
import './Home.css';
import { ReactComponent as Logo } from './images/Dencity.svg';
import KakaoLogo from './images/kakao_login_btn.png';

import { UserContext } from "./UserContext"; // import the context

const KakaoLogin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext); // Use the context

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("0863428c06e9c37bf600d68470c14ee0");
    }
  }, []);

  const handleLogin = () => {
    window.Kakao.Auth.login({
      success: (authObj) => {
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: (res) => {
            const userName = res.properties.nickname;
            const userProfile = res.properties.profile_image;
            const userEmail = res.kakao_account.email;
            setUser({ name: userName , profile: userProfile, email:userEmail}); // 카카오 닉네임
            navigate("/oauth/callback/kakao", { state: authObj });
          },
          fail: (error) => {
            console.log(error);
          },
        });
      },
      fail: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <div className="kakao-login-container">
      <Logo className='logo-image'/>
      <img
        className='kakao-login-button'
        src={KakaoLogo}
        alt="카카오로 로그인하기"
        onClick={handleLogin}
      />
    </div>
  );
};

export default KakaoLogin;
