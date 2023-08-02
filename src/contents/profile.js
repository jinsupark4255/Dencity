import React, { useContext } from 'react';
import { UserContext } from './UserContext';

const Profile = () => {
  const { user } = useContext(UserContext); // Context에서 user 정보를 가져옵니다.

  return (
    <div>
      {user ? (
        <h1>이름: {user.name} / 이메일 주소: {user.account_email} / 성별:{user.gender}
        </h1>
      ) : (
        <h1>프로필 정보가 없습니다.</h1>
      )}
    </div>
  );
};

export default Profile;
