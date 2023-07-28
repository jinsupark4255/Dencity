import React, { useState, useEffect } from 'react';
import "./nav.css"
import { ReactComponent as Image1 } from './Chaos.svg';
import { ReactComponent as Image2 } from './Weather.svg';
import { ReactComponent as Image3 } from './Dust.svg';
import { ReactComponent as Image4 } from './Community.svg';
import { ReactComponent as Image5 } from './nav_bar.svg';
import { ReactComponent as DownButton } from './Polygon.svg';
import { ReactComponent as Emoji } from './Emoji.svg';
import backgroundImage from './kakao_map.png';

function Map() {
  useEffect(() => {
    const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
    const options = { // 지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표. 서울시청 좌표
      level: 3 // 지도의 레벨(확대, 축소 정도)
    };
  
    const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
  
    // 마커가 표시될 위치입니다 
    var markerPosition  = new window.kakao.maps.LatLng(37.566826, 126.9786567); 
  
    // 마커를 생성합니다
    var marker = new window.kakao.maps.Marker({
      position: markerPosition
    });
  
    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  
  }, []);
  
  const [color, setColor] = useState({ n: 'white', n2: 'white', n3: 'white', n4: 'white', t1: 'white' });
  const [fillColor, setFillColor] = useState({ n: 'white', n2: 'white', n3: 'white', n4: 'white', t1: 'white' });
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);

  const handleClick = (box) => {
    setColor({ ...color, [box]: 'orange' });
    setFillColor({ ...fillColor, [box]: 'orange' });
    setTimeout(() => {
      setColor({ ...color, [box]: 'white' });
      setFillColor({ ...fillColor, [box]: 'white' });
    }, 200);
  };

  const handleDropdownClick1 = () => {
    setDropdownOpen1(!dropdownOpen1);
  }

  const handleDropdownClick2 = () => {
    setDropdownOpen2(!dropdownOpen2);
  }

  return (
    <div className="mapscale" id="map" style={{ width: '390px', height: '844px' }}>
      <img src={backgroundImage} alt="background" style={{ width: "100%", height: "100%" }} />
      <div className='t_nav'>
        <div className='t1' style={{ backgroundColor: color.t1 }} onClick={() => handleClick('t1')}><Image5 fill={fillColor.t1} className="img-size5" /></div>
        <div className='t2' >
          <div className='t2_1'>고궁/문화유산
            {dropdownOpen1 && (
              <div className="dropdown-menu">
                <div className="dropdown-item">1-ㄴㅇㄹㄴㅇㄹㄴㄹㄴㅇㄹㄴㅇㄹ1</div>
                <div className="dropdown-item">1-ㄴㅇㄹㅇㄹ2</div>
                <div className="dropdown-item">1-3ㄴㅇㄹㄴㅇㄹㄴㅇ</div>
              </div>
            )}</div>
          <div className='t2_2' onClick={handleDropdownClick1}><DownButton className="img-down" /></div>
        </div>
        <div className='t2'>
          <div className='t2_1'>경복궁
            {dropdownOpen2 && (
              <div className="dropdown-menu">
                <div className="dropdown-item">1-ㄴㅇsss</div>
                <div className="dropdown-item">aa</div>
                <div className="dropdown-item">1bbㄴㅇ</div>
              </div>
            )}</div>
          <div className='t2_2' onClick={handleDropdownClick2}><DownButton className="img-down" /></div>
        </div>
        <div className='t4'><Emoji/></div>
        <div className='t5'>혼잡!</div>
      </div>
      <div className='b_nav'>
        <div className='n' style={{ backgroundColor: color.n }} onClick={() => handleClick('n')}><Image1 fill={fillColor.n} className="img-size" /><p className='icon_name'>혼잡도</p></div>
        <div className='n2' style={{ backgroundColor: color.n2 }} onClick={() => handleClick('n2')}><Image2 fill={fillColor.n2} className="img-size2" /><p className='icon_name'>날씨</p></div>
        <div className='n3' style={{ backgroundColor: color.n3 }} onClick={() => handleClick('n3')}><Image3 fill={fillColor.n3} className="img-size3" /><p className='icon_name'>미세먼지</p></div>
        <div className='n4' style={{ backgroundColor: color.n4 }} onClick={() => handleClick('n4')}><Image4 fill={fillColor.n4} className="img-size4" /><p className='icon_name'>커뮤니티</p></div>
      </div>
    </div>
  );
}

export default Map;
