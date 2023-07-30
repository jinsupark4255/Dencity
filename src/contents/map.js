import React, { useState, useEffect, useRef } from 'react';
import './nav.css'
import AgePieChart from './AgePieChart';
import GenderPieChart from './GenderPieChart';
import { ReactComponent as Image1 } from './mypage.svg';
import { ReactComponent as Image2 } from './commu.svg';
import { ReactComponent as DButton } from './dropbutton.svg';
import { ReactComponent as DButton2 } from './dropbutton2.svg';
import { ReactComponent as ChaosButton1 } from './chaos_icon_1.svg';
import { ReactComponent as WeatherButton2 } from './weather_icon_2.svg';
import { ReactComponent as DustButton2 } from './dust_icon_2.svg';
import { ReactComponent as HelpButton } from './Help.svg';
import { ReactComponent as DizzyEmoji } from './Dizzy.svg';
import { ReactComponent as CommunityFloat } from './commu_float.svg';
import { ReactComponent as First } from './10대.svg';
import { ReactComponent as Second } from './20대.svg';
import { ReactComponent as Third } from './30대.svg';
import { ReactComponent as Fourth } from './40대.svg';
import { ReactComponent as Fifth } from './50대.svg';
import { ReactComponent as Sixth } from './60대.svg';

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
  const ageData = [
    { ageGroup: '8.6%', value: 8.6 },
    { ageGroup: '43.4%', value: 43.4 },
    { ageGroup: '16.6%', value: 16.6 },
    { ageGroup: '11.0%', value: 11 },
    { ageGroup: '9.1%', value: 9.1 },
    { ageGroup: '11.3%', value: 11.3 },
  ];
  const genderData = [
    { gender: '40.6%', value: 40.6 },
    { gender: '59.4', value: 59.4 },
  ];
  const helpButtonRef = useRef(null);
  const [floatingBoxPosition, setFloatingBoxPosition] = useState({ top: 0, left: 0 });
  const updateFloatingBoxPosition = () => {
    if (helpButtonRef.current) {
      const rect = helpButtonRef.current.getBoundingClientRect();
      setFloatingBoxPosition({
        top: rect.top + window.scrollY - 46,
        left: rect.left + rect.width - 112
      });
    }
  };
  const showFloatingHelpBox = () => {
    updateFloatingBoxPosition();
    setShowHelpBox(true);
  };
  const [showHelpBox, setShowHelpBox] = useState(false);

  const hideFloatingHelpBox = () => {
    setShowHelpBox(false);
  }
  const [selected, setSelected] = useState('chaos');
  const [selectedDropdown1, setSelectedDropdown1] = useState("고궁/문화유산");
  const [selectedDropdown2, setSelectedDropdown2] = useState("경복궁");

  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  useEffect(() => {
    if (showHelpBox) {
      window.addEventListener('scroll', updateFloatingBoxPosition);
    }

    return () => {
      window.removeEventListener('scroll', updateFloatingBoxPosition);
    };
  }, [showHelpBox]);
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
      <CommunityFloat className="community-float" />
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
          <div className={`chaos ${selected === 'chaos' ? 'selected' : ''}`} onClick={() => setSelected('chaos')}>
            <ChaosButton1 className="chaos_icon" />
            <span className='mid_text_1'>혼잡도</span>
          </div>
          <div className={`weather ${selected === 'weather' ? 'selected' : ''}`} onClick={() => setSelected('weather')}>
            <WeatherButton2 className="weather_icon" />
            <span className='mid_text_2'>날씨</span>
          </div>
          <div className={`dust ${selected === 'dust' ? 'selected' : ''}`} onClick={() => setSelected('dust')}>
            <DustButton2 className="dust_icon" />
            <span className='mid_text_3'>미세먼지</span>
          </div>
        </div>
        <div className='detail-view'>
          <div className='population'>
            <div className='population_top'>
              <HelpButton
                ref={helpButtonRef} // 참조 연결
                className='help_button'
                onMouseEnter={showFloatingHelpBox}
                onClick={showFloatingHelpBox}
                onMouseLeave={hideFloatingHelpBox}
              />
              <div className='pop_text'>실시간 인구</div>
            </div>
            <div className='population_2'>
              <div className='population_bottom'>
                <div className='emoji'><DizzyEmoji /></div>
                <div className='dizzyness'>혼잡</div>
              </div>
              <div className='diz_text'>사람이 몰려있을 가능성이 매우 크고 많이 붐빈다고 느낄 수 있어요.<br /> 인구밀도가 높은 구간에서는 도보 이동시 부딪힘이 발생할 수 있어요.</div>
            </div>
          </div>
          <div className='age'>
            <div className='age_top'></div>
            <div className='age_text'>연령대별 비율</div>
            <div className='age_bottom'>
              <AgePieChart data={ageData} width={200} height={200} />
              <div className='age_detail'>
                <First /><span className='a_text'>10대 이하</span>
                <Second /><span className='a_text'>20대</span>
                <Third /><span className='a_text'>30대</span>
                <Fourth /><span className='a_text'>40대</span>
                <Fifth /><span className='a_text'>50대</span>
                <Sixth /><span className='a_text'>60대 이상</span>
              </div>
            </div>
          </div>
          <div className='gender'>
            <div className='gender_text'>성별 비율</div>
            <div className='genderbutton'><GenderPieChart  data={genderData} width={200} height={200} /></div>
          </div>


        </div>
      </div>
      {showHelpBox && (
        <div className="floating-help-box" style={floatingBoxPosition}>
          <div className='text-box'>해당 장소에 사람이 얼마나 붐비는지 <br />나타내는 지표로, 과거 평균 실시간 인<br />구와 면적 대비 인구 수 등을 고려하여<br /> 산출합니다.</div>
        </div>
      )}
    </div>
  );
}

export default Map;
