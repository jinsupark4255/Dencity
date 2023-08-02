import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 'useNavigate'를 가져옵니다.
import { UserContext } from './UserContext';
import './Home.css';
import Logo from './images/logo.png';
import KakaoLogo from './images/kakao_login_btn.png';

const KakaoLogin = () => {
  const navigate = useNavigate(); // 'useNavigate'를 사용합니다.
  const { saveUser } = useContext(UserContext);

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('0863428c06e9c37bf600d68470c14ee0');
    }
  }, []);

  const handleLogin = () => {
    window.Kakao.Auth.login({
      success: (authObj) => {
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => {
            const userInfo = {
              name: res.properties.nickname,//사용자 이름
              account_email: res.kakao_account.email,//사용자 이메일
              nickname: res.properties.nickname, //사용자의 닉네임
              profile_image: res.properties.profile_image,//사용자의 프로필 이미지
              thumbnail: res.properties.thumbnail_image, //사용자의 썸네일 이미지 URL
              age_range: res.kakao_account.age_range,//사용자의 연령대
              birthday: res.kakao_account.birthday,//사용자의 생일
              gender: res.kakao_account.gender//사용자의 성별
            };
            saveUser(userInfo); // 사용자 정보를 저장합니다.
            navigate('/profile'); // '/profile'로 이동합니다.
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
