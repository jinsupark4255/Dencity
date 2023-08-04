import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import axios from 'axios';

import './nav.css'
import AgePieChart from './AgePieChart';
import GenderPieChart from './GenderPieChart';
import { ReactComponent as Image1 } from './images/mypage.svg';
import { ReactComponent as Image2 } from './images/commu.svg';
import { ReactComponent as DButton } from './images/dropbutton.svg';
import { ReactComponent as DButton2 } from './images/dropbutton2.svg';
import { ReactComponent as ChaosButton1 } from './images/chaos_icon_1.svg';
import { ReactComponent as ChaosButton2 } from './images/chaos_icon_2.svg';
import { ReactComponent as WeatherButton1 } from './images/weather_icon_1.svg';
import { ReactComponent as WeatherButton2 } from './images/weather_icon_2.svg';
import { ReactComponent as DustButton1 } from './images/dust_icon_1.svg';
import { ReactComponent as DustButton2 } from './images/dust_icon_2.svg';
import { ReactComponent as HelpButton } from './images/Help.svg';
import { ReactComponent as DizzyEmoji } from './images/Dizzy.svg';
import { ReactComponent as CommunityFloat } from './images/commu_float.svg';
import { ReactComponent as First } from './images/10대.svg';
import { ReactComponent as Second } from './images/20대.svg';
import { ReactComponent as Third } from './images/30대.svg';
import { ReactComponent as Fourth } from './images/40대.svg';
import { ReactComponent as Fifth } from './images/50대.svg';
import { ReactComponent as Sixth } from './images/60대.svg';

import { ReactComponent as Male } from './images/male.svg';
import { ReactComponent as Female } from './images/female.svg';
import { ReactComponent as Red } from './images/red.svg';
import { ReactComponent as Green } from './images/green.svg';
import { ReactComponent as Yellow } from './images/yellow.svg';
import { ReactComponent as Orange } from './images/orange.svg';
import { ReactComponent as AirMarker_Yellow } from './images/air_marker_Y.svg';
import { ReactComponent as Aline } from './images/aline.svg';
import { ReactComponent as Bline } from './images/bline.svg';

import sunnyIcon from './images/sunny.svg';


function MainPage() {
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
  const toggleFloatingHelpBox = () => {
    if (showHelpBox) {
      hideFloatingHelpBox();
    } else {
      showFloatingHelpBox();
    }
  };
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


  const [buttons, setButtons] = useState({
    chaos: ChaosButton1,
    weather: WeatherButton2,
    dust: DustButton2,
  });

  const [activeButton, setActiveButton] = useState('chaos');
  const handleChaosClick = () => {
    setButtons({
      chaos: ChaosButton1,
      weather: WeatherButton2,
      dust: DustButton2,
    });
    setActiveButton('chaos');
  };

  const handleWeatherClick = () => {
    setButtons({
      chaos: ChaosButton2,
      weather: WeatherButton1,
      dust: DustButton2,
    });
    setActiveButton('weather');
  };

  const handleDustClick = () => {
    setButtons({
      chaos: ChaosButton2,
      weather: WeatherButton2,
      dust: DustButton1,
    });
    setActiveButton('dust');
  };


  const StyledAirState = styled.div`
  color: ${(props) => {
    switch (props.status) {
      case '안정':
        return '#00E92A';
      case '보통':
        return `#FFD600;`;
      case '주의':
        return '#FF9900';
      case '위험':
        return '#E80000';
      default:
        return 'black';
    }
  }};
`;

const StyledLittleDust = styled.div`
  color: ${(props) => {
    switch (props.status) {
      case '좋음':
        return '#00E92A';
      case '보통':
        return `#FFD600;`;
      case '주의':
        return '#FF9900';
      case '위험':
        return '#E80000';
      default:
        return 'black';
    }
  }};
`;

const StyledTinyDust = styled.div`
  color: ${(props) => {
    switch (props.status) {
      case '좋음':
        return '#00E92A';
      case '보통':
        return `#FFD600;`;
      case '주의':
        return '#FF9900';
      case '위험':
        return '#E80000';
      default:
        return 'black';
    }
  }};
`;

//오존 농도 색깔
const StyledD1 = styled.div`
  color: ${(props) => {
    switch (props.status) {
      case '좋음':
        return '#00E92A';
      case '보통':
        return `#FFD600;`;
      case '주의':
        return '#FF9900';
      case '위험':
        return '#E80000';
      default:
        return 'black';
    }
  }};
`;

//이산화질소 색깔
const StyledD2 = styled.div`
  color: ${(props) => {
    switch (props.status) {
      case '좋음':
        return '#00E92A';
      case '보통':
        return `#FFD600;`;
      case '주의':
        return '#FF9900';
      case '위험':
        return '#E80000';
      default:
        return 'black';
    }
  }};
`;

//일산화탄소 색깔
const StyledD3 = styled.div`
  color: ${(props) => {
    switch (props.status) {
      case '좋음':
        return '#00E92A';
      case '보통':
        return `#FFD600;`;
      case '주의':
        return '#FF9900';
      case '위험':
        return '#E80000';
      default:
        return 'black';
    }
  }};
`;

//아황산가스 색깔
const StyledD4 = styled.div`
  color: ${(props) => {
    switch (props.status) {
      case '좋음':
        return '#00E92A';
      case '보통':
        return `#FFD600;`;
      case '주의':
        return '#FF9900';
      case '위험':
        return '#E80000';
      default:
        return 'black';
    }
  }};
`;


  const forecastData_top = [
    { emogi: 'sunny', value: 'sunny' },
    { temperature: '29.7°C', value: '29.7°C' },
  ];

  const forecastData_minmax = [
    { min: '25°C', value: '25°C' },
    { max: '29°C', value: '29°C' },
  ];

  const forecastData_time = [
    { weather0: '16시', value: '16시' },
    { weather1: '17시', value: '17시' },
    { weather2: '18시', value: '18시' },
    { weather3: '19시', value: '19시' },
    { weather4: '20시', value: '20시' },
    { weather5: '21시', value: '21시' },
    { weather6: '22시', value: '22시' }
  ];

  const forecastData_weather = [
    { weather0: 'cloud', value: 'cloud' },
    { weather1: 'sunny', value: 'sunny' },
    { weather2: 'sunny', value: 'sunny' },
    { weather3: 'sunny', value: 'sunny' },
    { weather4: 'sunny', value: 'sunny' },
    { weather5: 'sunny', value: 'sunny' },
    { weather6: 'sunny', value: 'sunny' }
  ];

  const forecastData_temperature = [
    { weather0: '30°C', value: '30°C' },
    { weather1: '30°C', value: '30°C' },
    { weather2: '30°C', value: '30°C' },
    { weather3: '30°C', value: '30°C' },
    { weather4: '30°C', value: '30°C' },
    { weather5: '30°C', value: '30°C' },
    { weather6: '30°C', value: '30°C' }
  ];

  const forecastData_precipitation = [
    { weather0: '--', value: '--' },
    { weather1: '--', value: '--' },
    { weather2: '--', value: '--' },
    { weather3: '--', value: '--' },
    { weather4: '--', value: '--' },
    { weather5: '--', value: '--' },
    { weather6: '--', value: '--' }
  ];

  const forecastData_probability = [
    { weather0: '30%', value: '30%' },
    { weather1: '30%', value: '30%' },
    { weather2: '30%', value: '30%' },
    { weather3: '30%', value: '30%' },
    { weather4: '30%', value: '30%' },
    { weather5: '30%', value: '30%' },
    { weather6: '30%', value: '30%' }
  ];

  const currentDate = new Date();
  function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  }
  const formattedDate = formatDateTime(currentDate);


  const renderDetailView = () => {
    switch (selected) {
      case 'chaos':
        return (
          <div className='detail-view'>
            <div className='population'>
              <div className='population_top'>
                <HelpButton
                  ref={helpButtonRef} // 참조 연결
                  className='help_button'
                  onMouseEnter={showFloatingHelpBox}
                  onClick={toggleFloatingHelpBox}
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
              <div className='gender_bottom'>
                <div className='male_gender'>
                  <Male className='male_icon' /><span className='male_text'>남성</span>
                </div>

                <div className='genderbutton'><GenderPieChart data={genderData} width={200} height={200} /></div>
                <div className='female_gender'>
                  <Female className='female_icon' /><span className='female_text'>여성</span>
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

      case 'weather':
        return (
          <div className='detail-view' style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '115px', left: '130px' }}>
              {forecastData_top.map((data) =>
                data.value === 'sunny' ? (
                  <img src={sunnyIcon} alt="sunny" width="88" height="88" />
                ) : null
              )}
            </div>

            <div
              style={{
                position: 'absolute',
                top: '226px',
                left: '128px',
                height: '29px',
                color: '#000',
                fontFamily: 'Inter',
                fontSize: '24px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              {forecastData_top[1].temperature}
            </div>

            <div
              style={{
                position: 'absolute',
                top: '56px',
                left: '18px',
                height: '12px',
                color: '#000',
                fontFamily: 'Inter',
                fontSize: '10px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              {formattedDate} 기준
            </div>
            <div
              style={{
                position: 'absolute',
                top: '290px',
                left: '172px',
                width: '1px',
                height: '25px',
                backgroundColor: '#000',
              }}
            ></div>
            <div
              style={{
                position: 'absolute',
                top: '290px',
                left: '100px',
                height: '17px', // 최저 기온, 최고 기온을 상자 안에 17px 높이로 조정
                color: '#000',
                fontFamily: 'Inter',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              {forecastData_minmax[0].min}
            </div>
            <div
              style={{
                position: 'absolute',
                top: '290px',
                left: '282px', // 최저 기온과 최고 기온 사이에 25px만큼 떨어지도록 조정
                height: '17px', // 최저 기온, 최고 기온을 상자 안에 17px 높이로 조정
                color: '#000',
                fontFamily: 'Inter',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              {forecastData_minmax[1].max}
            </div>

            <div
              style={{
                position: 'absolute',
                top: '290px',
                left: '22px', // 최저 기온과 최고 기온 사이에 25px만큼 떨어지도록 조정
                height: '17px', // 최저 기온, 최고 기온을 상자 안에 17px 높이로 조정
                color: '#000',
                fontFamily: 'Inter',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              최저기온
            </div>
            <div
              style={{
                position: 'absolute',
                top: '290px',
                left: '204px', // 최저 기온과 최고 기온 사이에 25px만큼 떨어지도록 조정
                height: '17px', // 최저 기온, 최고 기온을 상자 안에 17px 높이로 조정
                color: '#000',
                fontFamily: 'Inter',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              최고기온
            </div>

            <div
              style={{
                position: 'absolute',
                top: '371px',
                left: '18px', // 최저 기온과 최고 기온 사이에 25px만큼 떨어지도록 조정
                height: '24px', // 최저 기온, 최고 기온을 상자 안에 17px 높이로 조정
                color: '#000',
                fontFamily: 'Inter',
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              24시간 날씨 예보
            </div>

          </div>
        );
      case 'dust'://dust 부분
        return (
          <div className='detail-view'>
            <span className='today_date'>{formattedDate} 기준</span>
            <div>
              <div className='airpollution_state'>
                <div className='air_text'>통합대기환경지수</div>
                <StyledAirState className='air_state' status="보통">보통</StyledAirState>
              </div>
              <div className='graph'> 
                <div className='marker'>
                  <AirMarker_Yellow />
                </div>
                <div className='air_graph'><Green /><Yellow /><Orange /><Red /></div>
              </div>
            </div>
            <div className='air_detail_data'>
              <div className='little_dust'>
                <div className='little_text'>미세먼지</div>
                <StyledLittleDust className='little_state' status="좋음">23㎍/㎥ 좋음</StyledLittleDust>
              </div>
              <div className='tiny_dust'>
                <div className='tiny_text'>초미세먼지</div>
                <StyledTinyDust className='tiny_state' status='보통'>17㎍/㎥ 보통</StyledTinyDust>
              </div>
            </div>
            <div className='diagram'>
              <div className='upper'>
                <div className='upper_1'>
                  <div className='up_text1'>오존농도</div>
                  <StyledD1 className='up_state1' status='보통'>0.062ppm 보통</StyledD1>
                </div>
                <div className='upper_2'>
                  <div className='up_text2'>이산화질소</div>
                  <StyledD2 className='up_state2' status='좋음'>0.013ppm 좋음</StyledD2>
                </div>
              </div>
              <div className='down'>
                <div className='down_1'>
                  <div className='down_text1'>일산화탄소</div>
                  <StyledD3 className='down_state1' status='좋음'>0.4ppm 좋음</StyledD3>
                </div>
                <div className='down_2'>
                  <div className='down_text2'>아황산가스</div>
                  <StyledD4 className='down_state2' status='좋음'>0.003ppm 좋음</StyledD4>
                </div>
              </div>
              <Aline className='aline' />
              <Bline className='bline' />
            </div>
          </div>
        );
      default:
        return null;
    }
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
          <div className={`chaos ${activeButton === 'chaos' ? 'active' : ''}`} onClick={() => {
            handleChaosClick();
            setSelected('chaos');
          }}>
            <buttons.chaos className="chaos_icon" />
            <span className='mid_text_1'>혼잡도</span>
          </div>
          <div className={`weather ${activeButton === 'weather' ? 'active' : ''}`} onClick={() => {
            handleWeatherClick();
            setSelected('weather');
          }}>
            <buttons.weather className="weather_icon" />
            <span className='mid_text_2'>날씨</span>
          </div>
          <div className={`dust ${activeButton === 'dust' ? 'active' : ''}`} onClick={() => {
            handleDustClick();
            setSelected('dust');
          }}>
            <buttons.dust className="dust_icon" />
            <span className='mid_text_3'>미세먼지</span>
          </div>
        </div>
        {renderDetailView()}
      </div>

    </div>
  );
}

export default MainPage;