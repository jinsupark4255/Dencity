import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // 'useNavigate'를 사용합니다.
import { useAuth } from './AuthContext';
const KakaoCallback = () => {
  const { setAuthObj } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const authObj = location.state;
    setAuthObj(authObj); // Context를 사용하여 authObj를 설정합니다.

    console.log(authObj);
    navigate('/main');
  }, [location, navigate, setAuthObj]);

  return (
    <div>
      로그인 처리 중...
    </div>
  );
};

export default KakaoCallback;
