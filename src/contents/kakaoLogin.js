import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 'useNavigate'를 가져옵니다.
import './Home.css';
import Logo from './images/logo.png';
import KakaoLogo from './images/kakao_login_btn.png';

import { UserContext } from "./UserContext"; // import the context

const KakaoLogin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext); // Use the context

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("bed2468089c58f53cf785a627b6dcf9b");
    }
  }, []);

  const handleLogin = () => {
    window.Kakao.Auth.login({
      success: (authObj) => {
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: (res) => {
            const userName = res.properties.nickname;
            setUser({ name: userName }); // 카카오 닉네임
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

      <img
        className="logo-image"
        src={Logo}
        alt="로고 이미지"
      />
      
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
