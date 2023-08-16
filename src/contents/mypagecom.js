import React, { useContext } from 'react';
import './nav.css'
import { UserContext } from './UserContext';
import { ReactComponent as Back } from './images/mypage_back.svg';
import { ReactComponent as Logo } from './images/mypage_logo.svg';
import { useNavigate } from 'react-router-dom';


function Mypage() {
    const navigate = useNavigate();
    
    const [user, setUser] = useContext(UserContext); //여기서 카카오 사용자 이름 가져옴
    console.log(user ? `Hello, ${user.name}` : 'You are not logged in'); //카카오 로그인 정보 가져오기  
    return (
        <div className='view2'>
            <header className='mypage_top'>
                <div className='back_button' onClick={() => navigate(-1)}><Back/></div>
                <div className='my'>MY</div>
            </header>
            <div className='mypage_view'>
                <section className='my_main'>
                    <img className='profile'src={user.profile} alt="카카오 프로필 사진" />
                    <div className='userName'>{user.name}</div>
                    <div className='userEmail'>{user.email}</div>
                </section>
                <section className='my_account'>
                    <div className='a1'>계정</div>
                    <div className='a2'>비밀번호 변경</div>
                    <div className='a2'>이메일 변경</div>
                </section>
                <section className='my_info'>
                    <div className='i1'>이용 안내</div>
                    <div className='i2'>앱 버전</div>
                    <div className='i2'>문의하기</div>
                    <div className='i2'>공지사항</div>
                    <div className='i2'>서비스 이용약관</div>
                    <div className='i2'>개인정보 처리방침</div>
                </section>
                <section className='my_extra'>
                    <div className='e1'>기타</div>
                    <div className='e2'>정보 동의설정</div>
                    <div className='e2'>회원 탈퇴</div>
                    <div className='e2'>로그아웃</div>
                </section>
                <section className='my_logo'><Logo/></section>
            </div>
        </div>
    );
}

export default Mypage;