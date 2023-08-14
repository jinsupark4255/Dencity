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
        <div className='view'>
            <header className='mypage_top'>
                <div className='back_button' onClick={() => navigate('/main')}><Back/></div>
                <div className='my'>MY</div>
            </header>
            <div className='mypage_view'>
                <section className='my_main'>
                    <div className='profile'></div>
                    <div className='userName'>{user.name}</div>
                    <div className='userEmail'></div>
                </section>
                <section className='my_account'>
                    <p>계정</p>
                    <p>비밀번호 변경</p>
                    <p>이메일 변경</p>
                </section>
                <section className='my_info'>
                    <p>이용 안내</p>
                    <p>앱 버전</p>
                    <p>문의하기</p>
                    <p>공지사항</p>
                    <p>서비스 이용약관</p>
                    <p>개인정보 처리방침</p>
                </section>
                <section className='my_extra'>
                    <p>기타</p>
                    <p>정보 동의설정</p>
                    <p>회원 탈퇴</p>
                    <p>로그아웃</p>
                </section>
                <section className='my_logo'><Logo/></section>
            </div>
        </div>
    );
}

export default Mypage;