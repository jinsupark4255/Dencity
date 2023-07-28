import React, { useState, useEffect } from 'react';
import './nav.css'
import { ReactComponent as Image1 } from './mypage.svg';
import { ReactComponent as Image2 } from './commu.svg';
import { ReactComponent as DButton } from './dropbutton.svg';
import { ReactComponent as DButton2 } from './dropbutton2.svg'; // Second dropdown image

function Map() {
  useEffect(() => {
    const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
    const options = { // 지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
      level: 3 // 지도의 레벨(확대, 축소 정도)
    };

    const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
    // 마커가 표시될 위치를 지도의 중심으로 설정
    const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);

    // 마커를 생성합니다
    const marker = new window.kakao.maps.Marker({
      position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  }, [])

  const [selected, setSelected] = useState('chaos');
  const [selectedDropdown1, setSelectedDropdown1] = useState("고궁/문화유산");
  const [selectedDropdown2, setSelectedDropdown2] = useState("경복궁");

  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  
  const handleDropdownClick1 = () => {
    setDropdownOpen1(!dropdownOpen1);
  }
  
  const handleDropdownClick2 = () => {
    setDropdownOpen2(!dropdownOpen2);
  }
  
  const handleDropdown1Item = (item) => {
    setSelectedDropdown1(item);
    setDropdownOpen1(false);
  };

  const handleDropdown2Item = (item) => {
    setSelectedDropdown2(item);
    setDropdownOpen2(false);
  };

  return (
    <div className='view'>
      <div className='top-view'>
        <div className='top-image'><Image1 /></div>
        <div className='logo'>로고</div>
        <div className='community'><Image2 /></div>
      </div>
      <div className='main-view'>
        <div className='top-main-view'>
          <div className='dropdown'>
            <div className='d1' onClick={handleDropdownClick1}>
              {selectedDropdown1}
              {dropdownOpen1 ? <DButton2 className="img-down" /> : <DButton className="img-down" />}
              {/* Dropdown menu code */}
              {dropdownOpen1 && (
                <div className="dropdown-menu">
                  <div className="dropdown-item1" onClick={() => handleDropdown1Item("고궁/문화유산")}>고궁/문화유산</div>
                  <div className="dropdown-item" onClick={() => handleDropdown1Item("공원")}>공원</div>
                  <div className="dropdown-item" onClick={() => handleDropdown1Item("관광특구")}>관광특구</div>
                  <div className="dropdown-item" onClick={() => handleDropdown1Item("발달상권")}>발달상권</div>
                  <div className="dropdown-item" onClick={() => handleDropdown1Item("인구밀집지역")}>인구밀집지역</div>
                </div>
              )}
            </div>
          </div>
          <div className='dropdown2'>
            <div className='d1' onClick={handleDropdownClick2}>
              {selectedDropdown2}
              {dropdownOpen2 ? <DButton2 className="img-down2" /> : <DButton className="img-down2" />}
              {/* Dropdown menu code */}
              {dropdownOpen2 && (
                <div className="dropdown-menu">
                  <div className="dropdown-item1" onClick={() => handleDropdown2Item("경복궁")}>경복궁</div>
                  <div className="dropdown-item" onClick={() => handleDropdown2Item("떡볶이")}>떡볶이</div>
                  <div className="dropdown-item" onClick={() => handleDropdown2Item("남산타워")}>남산타워</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mapscale" id="map" style={{ width: '364px', height: '246px' }} />
        <div className='mid-main-view'>
          <div className={`chaos ${selected === 'chaos' ? 'selected' : ''}`} onClick={() => setSelected('chaos')}></div>
          <div className={`weather ${selected === 'weather' ? 'selected' : ''}`} onClick={() => setSelected('weather')}></div>
          <div className={`dust ${selected === 'dust' ? 'selected' : ''}`} onClick={() => setSelected('dust')}></div>
        </div>
        <div className='detail-view'>

        </div>
      </div>
    </div>
  );
}

export default Map;
