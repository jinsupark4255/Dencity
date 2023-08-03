import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 'useNavigate'를 가져옵니다.
import './Home.css';
import Logo from './images/logo.png';
import KakaoLogo from './images/kakao_login_btn.png';

const KakaoLogin = () => {
  const navigate = useNavigate(); // 'useNavigate'를 사용합니다.

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('0863428c06e9c37bf600d68470c14ee0');
    }
  }, []);

  const handleLogin = () => {
    window.Kakao.Auth.login({
      success: (authObj) => {
        // 카카오 로그인 성공시, 리다이렉트 URI로 이동합니다.
        navigate('/oauth/callback/kakao', { state: authObj });
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
