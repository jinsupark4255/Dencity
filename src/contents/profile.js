import React from 'react';
import { useAuth } from './AuthContext';

const Profile = () => {
  const { authObj } = useAuth();

  return (
    <div>
      {authObj ? `Access Token: ${authObj.access_token}` : '로그인을 해주세요.'}
    </div>
  );
};

export default Profile;