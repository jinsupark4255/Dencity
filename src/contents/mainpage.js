import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import './nav.css'
import AgePieChart from './AgePieChart';
import GenderPieChart from './GenderPieChart';
import { ReactComponent as Image1 } from './images/mypage.svg';
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
import { ReactComponent as LittleDizzyEmoji } from './images/Little_Dizzy.svg';
import { ReactComponent as AverageEmoji } from './images/Average.svg';
import { ReactComponent as GoodEmoji } from './images/Good.svg';
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
import { ReactComponent as AirMarker_Green } from './images/markergreen.svg';
import { ReactComponent as AirMarker_Yellow } from './images/air_marker_Y.svg';
import { ReactComponent as AirMarker_Orange } from './images/markerorange.svg';
import { ReactComponent as AirMarker_Red } from './images/markerred.svg';
import { ReactComponent as Dencity } from './images/Dencity.svg';

import sunnyIcon1 from './images/맑음1.svg';

import ForecastTable from './ForecastTable';
//commit check
function MainPage() {
  const [user, setUser] = useContext(UserContext); //여기서 카카오 사용자 이름 가져옴

  const [seoulPlace, setSeoulPlace] = useState('가산디지털단지역'); //여기는 드롭다운에서 장소 선택할때 쓰는거 (디폴트로 창덕궁 종묘로 지정함)
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
      draggable: true
    };

    const map = new window.kakao.maps.Map(container, options);

    // 사용자 입력 받기 (예: 검색창에서 '경복궁' 입력)
    searchPlaces(seoulPlace, map);

  }, [seoulPlace]);


  function searchPlaces(keyword, map) {
    const places = new window.kakao.maps.services.Places();

    places.keywordSearch(keyword, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다.
        map.setCenter(coords);

        // 마커를 생성하고 지도 위에 마커를 표시합니다.
        const marker = new window.kakao.maps.Marker({
          position: coords
        });
        marker.setMap(map);
      } else {
        console.log("장소를 찾지 못했습니다.");
      }
    });
  }

  const [loading, setLoading] = useState(false);

  //여기는 혼잡도 파트
  //가산디지털단지역
  const [areaCongest_1, setAreaCongest_1] = useState(null);
  const [areaCongestDetail_1, setAreaCongestDetail_1] = useState(null);
  const [ageCongest_1_10, setAgeCongest_1_10] = useState(null);
  const [ageCongest_1_20, setAgeCongest_1_20] = useState(null);
  const [ageCongest_1_30, setAgeCongest_1_30] = useState(null);
  const [ageCongest_1_40, setAgeCongest_1_40] = useState(null);
  const [ageCongest_1_50, setAgeCongest_1_50] = useState(null);
  const [ageCongest_1_60, setAgeCongest_1_60] = useState(null);
  const [malePopulationRate_1, setMalePopulationRate_1] = useState(null);
  const [femalePopulationRate_1, setFemalePopulationRate_1] = useState(null);
  const [dustRate1, setDustrate1] = useState(null);
  const [littleDust1, setLittle1] = useState(null);
  const [littleDustNum1, setLittleNum1] = useState(null);
  const [tinyDust1, setTiny1] = useState(null);
  const [tinyDustNum1, setTinyNum1] = useState(null);
  //강남역
  const [areaCongest_2, setAreaCongest_2] = useState(null);
  const [areaCongestDetail_2, setAreaCongestDetail_2] = useState(null);
  const [ageCongest_2_10, setAgeCongest_2_10] = useState(null);
  const [ageCongest_2_20, setAgeCongest_2_20] = useState(null);
  const [ageCongest_2_30, setAgeCongest_2_30] = useState(null);
  const [ageCongest_2_40, setAgeCongest_2_40] = useState(null);
  const [ageCongest_2_50, setAgeCongest_2_50] = useState(null);
  const [ageCongest_2_60, setAgeCongest_2_60] = useState(null);
  const [malePopulationRate_2, setMalePopulationRate_2] = useState(null);
  const [femalePopulationRate_2, setFemalePopulationRate_2] = useState(null);
  const [dustRate2, setDustrate2] = useState(null);
  const [littleDust2, setLittle2] = useState(null);
  const [littleDustNum2, setLittleNum2] = useState(null);
  const [tinyDust2, setTiny2] = useState(null);
  const [tinyDustNum2, setTinyNum2] = useState(null);
  //서울역
  const [areaCongest_3, setAreaCongest_3] = useState(null);
  const [areaCongestDetail_3, setAreaCongestDetail_3] = useState(null);
  const [ageCongest_3_10, setAgeCongest_3_10] = useState(null);
  const [ageCongest_3_20, setAgeCongest_3_20] = useState(null);
  const [ageCongest_3_30, setAgeCongest_3_30] = useState(null);
  const [ageCongest_3_40, setAgeCongest_3_40] = useState(null);
  const [ageCongest_3_50, setAgeCongest_3_50] = useState(null);
  const [ageCongest_3_60, setAgeCongest_3_60] = useState(null);
  const [malePopulationRate_3, setMalePopulationRate_3] = useState(null);
  const [femalePopulationRate_3, setFemalePopulationRate_3] = useState(null);
  const [dustRate3, setDustrate3] = useState(null);
  const [littleDust3, setLittle3] = useState(null);
  const [littleDustNum3, setLittleNum3] = useState(null);
  const [tinyDust3, setTiny3] = useState(null);
  const [tinyDustNum3, setTinyNum3] = useState(null);
  // 성수카페거리
  const [areaCongest_4, setAreaCongest_4] = useState(null);
  const [areaCongestDetail_4, setAreaCongestDetail_4] = useState(null);
  const [ageCongest_4_10, setAgeCongest_4_10] = useState(null);
  const [ageCongest_4_20, setAgeCongest_4_20] = useState(null);
  const [ageCongest_4_30, setAgeCongest_4_30] = useState(null);
  const [ageCongest_4_40, setAgeCongest_4_40] = useState(null);
  const [ageCongest_4_50, setAgeCongest_4_50] = useState(null);
  const [ageCongest_4_60, setAgeCongest_4_60] = useState(null);
  const [malePopulationRate_4, setMalePopulationRate_4] = useState(null);
  const [femalePopulationRate_4, setFemalePopulationRate_4] = useState(null);
  const [dustRate4, setDustrate4] = useState(null);
  const [littleDust4, setLittle4] = useState(null);
  const [littleDustNum4, setLittleNum4] = useState(null);
  const [tinyDust4, setTiny4] = useState(null);
  const [tinyDustNum4, setTinyNum4] = useState(null);
  // 시청광장
  const [areaCongest_5, setAreaCongest_5] = useState(null);
  const [areaCongestDetail_5, setAreaCongestDetail_5] = useState(null);
  const [ageCongest_5_10, setAgeCongest_5_10] = useState(null);
  const [ageCongest_5_20, setAgeCongest_5_20] = useState(null);
  const [ageCongest_5_30, setAgeCongest_5_30] = useState(null);
  const [ageCongest_5_40, setAgeCongest_5_40] = useState(null);
  const [ageCongest_5_50, setAgeCongest_5_50] = useState(null);
  const [ageCongest_5_60, setAgeCongest_5_60] = useState(null);
  const [malePopulationRate_5, setMalePopulationRate_5] = useState(null);
  const [femalePopulationRate_5, setFemalePopulationRate_5] = useState(null);
  const [dustRate5, setDustrate5] = useState(null);
  const [littleDust5, setLittle5] = useState(null);
  const [littleDustNum5, setLittleNum5] = useState(null);
  const [tinyDust5, setTiny5] = useState(null);
  const [tinyDustNum5, setTinyNum5] = useState(null);
  // 신촌이대역              
  const [areaCongest_6, setAreaCongest_6] = useState(null);
  const [areaCongestDetail_6, setAreaCongestDetail_6] = useState(null);
  const [ageCongest_6_10, setAgeCongest_6_10] = useState(null);
  const [ageCongest_6_20, setAgeCongest_6_20] = useState(null);
  const [ageCongest_6_30, setAgeCongest_6_30] = useState(null);
  const [ageCongest_6_40, setAgeCongest_6_40] = useState(null);
  const [ageCongest_6_50, setAgeCongest_6_50] = useState(null);
  const [ageCongest_6_60, setAgeCongest_6_60] = useState(null);
  const [malePopulationRate_6, setMalePopulationRate_6] = useState(null);
  const [femalePopulationRate_6, setFemalePopulationRate_6] = useState(null);
  const [dustRate6, setDustrate6] = useState(null);
  const [littleDust6, setLittle6] = useState(null);
  const [littleDustNum6, setLittleNum6] = useState(null);
  const [tinyDust6, setTiny6] = useState(null);
  const [tinyDustNum6, setTinyNum6] = useState(null);
  // 여의도  
  const [areaCongest_7, setAreaCongest_7] = useState(null);
  const [areaCongestDetail_7, setAreaCongestDetail_7] = useState(null);
  const [ageCongest_7_10, setAgeCongest_7_10] = useState(null);
  const [ageCongest_7_20, setAgeCongest_7_20] = useState(null);
  const [ageCongest_7_30, setAgeCongest_7_30] = useState(null);
  const [ageCongest_7_40, setAgeCongest_7_40] = useState(null);
  const [ageCongest_7_50, setAgeCongest_7_50] = useState(null);
  const [ageCongest_7_60, setAgeCongest_7_60] = useState(null);
  const [malePopulationRate_7, setMalePopulationRate_7] = useState(null);
  const [femalePopulationRate_7, setFemalePopulationRate_7] = useState(null);
  const [dustRate7, setDustrate7] = useState(null);
  const [littleDust7, setLittle7] = useState(null);
  const [littleDustNum7, setLittleNum7] = useState(null);
  const [tinyDust7, setTiny7] = useState(null);
  const [tinyDustNum7, setTinyNum7] = useState(null);
  // 잠실종합운동장   
  const [areaCongest_8, setAreaCongest_8] = useState(null);
  const [areaCongestDetail_8, setAreaCongestDetail_8] = useState(null);
  const [ageCongest_8_10, setAgeCongest_8_10] = useState(null);
  const [ageCongest_8_20, setAgeCongest_8_20] = useState(null);
  const [ageCongest_8_30, setAgeCongest_8_30] = useState(null);
  const [ageCongest_8_40, setAgeCongest_8_40] = useState(null);
  const [ageCongest_8_50, setAgeCongest_8_50] = useState(null);
  const [ageCongest_8_60, setAgeCongest_8_60] = useState(null);
  const [malePopulationRate_8, setMalePopulationRate_8] = useState(null);
  const [femalePopulationRate_8, setFemalePopulationRate_8] = useState(null);
  const [dustRate8, setDustrate8] = useState(null);
  const [littleDust8, setLittle8] = useState(null);
  const [littleDustNum8, setLittleNum8] = useState(null);
  const [tinyDust8, setTiny8] = useState(null);
  const [tinyDustNum8, setTinyNum8] = useState(null);
  // 창덕궁 종묘 
  const [areaCongest_9, setAreaCongest_9] = useState(null);
  const [areaCongestDetail_9, setAreaCongestDetail_9] = useState(null);
  const [ageCongest_9_10, setAgeCongest_9_10] = useState(null);
  const [ageCongest_9_20, setAgeCongest_9_20] = useState(null);
  const [ageCongest_9_30, setAgeCongest_9_30] = useState(null);
  const [ageCongest_9_40, setAgeCongest_9_40] = useState(null);
  const [ageCongest_9_50, setAgeCongest_9_50] = useState(null);
  const [ageCongest_9_60, setAgeCongest_9_60] = useState(null);
  const [malePopulationRate_9, setMalePopulationRate_9] = useState(null);
  const [femalePopulationRate_9, setFemalePopulationRate_9] = useState(null);
  const [dustRate9, setDustrate9] = useState(null);
  const [littleDust9, setLittle9] = useState(null);
  const [littleDustNum9, setLittleNum9] = useState(null);
  const [tinyDust9, setTiny9] = useState(null);
  const [tinyDustNum9, setTinyNum9] = useState(null);
  // 홍대입구역 9번출구     
  const [areaCongest_10, setAreaCongest_10] = useState(null);
  const [areaCongestDetail_10, setAreaCongestDetail_10] = useState(null);
  const [ageCongest_10_10, setAgeCongest_10_10] = useState(null);
  const [ageCongest_10_20, setAgeCongest_10_20] = useState(null);
  const [ageCongest_10_30, setAgeCongest_10_30] = useState(null);
  const [ageCongest_10_40, setAgeCongest_10_40] = useState(null);
  const [ageCongest_10_50, setAgeCongest_10_50] = useState(null);
  const [ageCongest_10_60, setAgeCongest_10_60] = useState(null);
  const [malePopulationRate_10, setMalePopulationRate_10] = useState(null);
  const [femalePopulationRate_10, setFemalePopulationRate_10] = useState(null);
  const [dustRate10, setDustrate10] = useState(null);
  const [littleDust10, setLittle10] = useState(null);
  const [littleDustNum10, setLittleNum10] = useState(null);
  const [tinyDust10, setTiny10] = useState(null);
  const [tinyDustNum10, setTinyNum10] = useState(null);

  const navigate = useNavigate();

  const place = "POI012";
  const place2 = "POI014";
  const place3 = "POI033";
  const place4 = "POI068";
  const place5 = "POI101";
  const place6 = "POI040";
  const place7 = "POI072";
  const place8 = "POI109";
  const place9 = "POI012";
  const place10 = "POI055";

  const url = `https://54.180.87.174/home?place=${encodeURIComponent(place)}`;
  const url2 = `https://54.180.87.174/home?place=${encodeURIComponent(place2)}`;
  const url3 = `https://54.180.87.174/home?place=${encodeURIComponent(place3)}`;
  const url4 = `https://54.180.87.174/home?place=${encodeURIComponent(place4)}`;
  const url5 = `https://54.180.87.174/home?place=${encodeURIComponent(place5)}`;
  const url6 = `https://54.180.87.174/home?place=${encodeURIComponent(place6)}`;
  const url7 = `https://54.180.87.174/home?place=${encodeURIComponent(place7)}`;
  const url8 = `https://54.180.87.174/home?place=${encodeURIComponent(place8)}`;
  const url9 = `https://54.180.87.174/home?place=${encodeURIComponent(place9)}`;
  const url10 = `https://54.180.87.174/home?place=${encodeURIComponent(place10)}`;

  // 가산디지털단지            const place = "POI013";
  // 강남역                    const place = "POI014";
  // 서울역                    const place = "POI033";
  // 성수카페거리              const place = "POI068";
  // 시청광장                  const place = "POI101";
  // 신촌이대역                const place = "POI040";
  // 여의도                    const place = "POI072";
  // 잠실종합운동장            const place = "POI109";
  // 창덕궁 종묘               const place = "POI012";
  // 홍대입구역 9번출구        const place = "POI055";
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // 받은 데이터 처리
        const parsedData = JSON.parse(data.jsonObject);
        console.log(data);
        //혼잡도 정도 및 설명
        const chaoSity = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['AREA_CONGEST_LVL'];
        const chaosityDetail = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['AREA_CONGEST_MSG'];

        // 나이대
        const age10 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_10'];
        const age20 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_20'];
        const age30 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_30'];
        const age40 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_40'];
        const age50 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_50'];
        const age60 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_60'];

        // 성별
        const rate = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['FEMALE_PPLTN_RATE'];
        const rate2 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['MALE_PPLTN_RATE'];

        //통합대기환경지수
        const dustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['AIR_IDX'];
        const littledustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM10_INDEX'];
        const tinydustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM25_INDEX'];
        const littledustNum = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM10'];
        const tinydustNum = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM25'];
        
        setFemalePopulationRate_1(rate);
        setMalePopulationRate_1(rate2);
        setAreaCongest_1(chaoSity);
        setAreaCongestDetail_1(chaosityDetail);
        setAgeCongest_1_10(age10);
        setAgeCongest_1_20(age20);
        setAgeCongest_1_30(age30);
        setAgeCongest_1_40(age40);
        setAgeCongest_1_50(age50);
        setAgeCongest_1_60(age60);
        setDustrate1(dustText);
        setLittle1(littledustText);
        setTiny1(tinydustText);
        setLittleNum1(littledustNum);
        setTinyNum1(tinydustNum);
      })
      .catch(error => {
        console.error('Error:', error);

      });


    fetch(url2)
      .then(response => response.json())
      .then(data => {
        // 받은 데이터 처리
        const parsedData = JSON.parse(data.jsonObject);
        console.log(data);
        //혼잡도 정도 및 설명
        const chaoSity = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['AREA_CONGEST_LVL'];
        const chaosityDetail = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['AREA_CONGEST_MSG'];

        // 나이대
        const age10 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_10'];
        const age20 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_20'];
        const age30 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_30'];
        const age40 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_40'];
        const age50 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_50'];
        const age60 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_60'];

        // 성별
        const rate = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['FEMALE_PPLTN_RATE'];
        const rate2 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['MALE_PPLTN_RATE'];

        //통합대기환경지수
        const dustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['AIR_IDX'];
        const littledustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM10_INDEX'];
        const tinydustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM25_INDEX'];
        const littledustNum = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM10'];
        const tinydustNum = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM25'];

        setFemalePopulationRate_2(rate);
        setMalePopulationRate_2(rate2);
        setAreaCongest_2(chaoSity);
        setAreaCongestDetail_2(chaosityDetail);
        setAgeCongest_2_10(age10);
        setAgeCongest_2_20(age20);
        setAgeCongest_2_30(age30);
        setAgeCongest_2_40(age40);
        setAgeCongest_2_50(age50);
        setAgeCongest_2_60(age60);
        setDustrate2(dustText);
        setLittle2(littledustText);
        setTiny2(tinydustText);
        setLittleNum2(littledustNum);
        setTinyNum2(tinydustNum);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    fetch(url3)
      .then(response => response.json())
      .then(data => {
        // 받은 데이터 처리
        const parsedData = JSON.parse(data.jsonObject);
        console.log(data);
        //혼잡도 정도 및 설명
        const chaoSity = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['AREA_CONGEST_LVL'];
        const chaosityDetail = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['AREA_CONGEST_MSG'];

        // 나이대
        const age10 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_10'];
        const age20 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_20'];
        const age30 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_30'];
        const age40 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_40'];
        const age50 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_50'];
        const age60 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_60'];

        // 성별
        const rate = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['FEMALE_PPLTN_RATE'];
        const rate2 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['MALE_PPLTN_RATE'];

        //통합대기환경지수
        const dustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['AIR_IDX'];
        const littledustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM10_INDEX'];
        const tinydustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM25_INDEX'];
        const littledustNum = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM10'];
        const tinydustNum = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM25'];

        setFemalePopulationRate_3(rate);
        setMalePopulationRate_3(rate2);
        setAreaCongest_3(chaoSity);
        setAreaCongestDetail_3(chaosityDetail);
        setAgeCongest_3_10(age10);
        setAgeCongest_3_20(age20);
        setAgeCongest_3_30(age30);
        setAgeCongest_3_40(age40);
        setAgeCongest_3_50(age50);
        setAgeCongest_3_60(age60);
        setDustrate3(dustText);
        setLittle3(littledustText);
        setTiny3(tinydustText);
        setLittleNum3(littledustNum);
        setTinyNum3(tinydustNum);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    fetch(url4)
      .then(response => response.json())
      .then(data => {
        // 받은 데이터 처리
        const parsedData = JSON.parse(data.jsonObject);
        console.log(data);
        //혼잡도 정도 및 설명
        const chaoSity = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['AREA_CONGEST_LVL'];
        const chaosityDetail = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['AREA_CONGEST_MSG'];

        // 나이대
        const age10 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_10'];
        const age20 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_20'];
        const age30 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_30'];
        const age40 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_40'];
        const age50 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_50'];
        const age60 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_60'];

        // 성별
        const rate = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['FEMALE_PPLTN_RATE'];
        const rate2 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['MALE_PPLTN_RATE'];

        //통합대기환경지수
        const dustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['AIR_IDX'];
        const littledustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM10_INDEX'];
        const tinydustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM25_INDEX'];
        const littledustNum = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM10'];
        const tinydustNum = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM25'];

        setFemalePopulationRate_4(rate);
        setMalePopulationRate_4(rate2);
        setAreaCongest_4(chaoSity);
        setAreaCongestDetail_4(chaosityDetail);
        setAgeCongest_4_10(age10);
        setAgeCongest_4_20(age20);
        setAgeCongest_4_30(age30);
        setAgeCongest_4_40(age40);
        setAgeCongest_4_50(age50);
        setAgeCongest_4_60(age60);
        setDustrate4(dustText);
        setLittle4(littledustText);
        setTiny4(tinydustText);
        setLittleNum4(littledustNum);
        setTinyNum4(tinydustNum);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    fetch(url5)
      .then(response => response.json())
      .then(data => {
        // 받은 데이터 처리
        const parsedData = JSON.parse(data.jsonObject);
        console.log(data);
        //혼잡도 정도 및 설명
        const chaoSity = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['AREA_CONGEST_LVL'];
        const chaosityDetail = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['AREA_CONGEST_MSG'];

        // 나이대
        const age10 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_10'];
        const age20 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_20'];
        const age30 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_30'];
        const age40 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_40'];
        const age50 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_50'];
        const age60 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_60'];

        // 성별
        const rate = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['FEMALE_PPLTN_RATE'];
        const rate2 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['MALE_PPLTN_RATE'];

        //통합대기환경지수
        const dustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['AIR_IDX'];
        const littledustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM10_INDEX'];
        const tinydustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM25_INDEX'];
        const littledustNum = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM10'];
        const tinydustNum = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM25'];

        setFemalePopulationRate_5(rate);
        setMalePopulationRate_5(rate2);
        setAreaCongest_5(chaoSity);
        setAreaCongestDetail_5(chaosityDetail);
        setAgeCongest_5_10(age10);
        setAgeCongest_5_20(age20);
        setAgeCongest_5_30(age30);
        setAgeCongest_5_40(age40);
        setAgeCongest_5_50(age50);
        setAgeCongest_5_60(age60);
        setDustrate5(dustText);
        setLittle5(littledustText);
        setTiny5(tinydustText);
        setLittleNum5(littledustNum);
        setTinyNum5(tinydustNum);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    fetch(url6)
      .then(response => response.json())
      .then(data => {
        // 받은 데이터 처리
        const parsedData = JSON.parse(data.jsonObject);
        console.log(data);
        //혼잡도 정도 및 설명
        const chaoSity = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['AREA_CONGEST_LVL'];
        const chaosityDetail = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['AREA_CONGEST_MSG'];

        // 나이대
        const age10 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_10'];
        const age20 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_20'];
        const age30 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_30'];
        const age40 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_40'];
        const age50 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_50'];
        const age60 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_60'];

        // 성별
        const rate = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['FEMALE_PPLTN_RATE'];
        const rate2 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['MALE_PPLTN_RATE'];

        //통합대기환경지수
        const dustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['AIR_IDX'];
        const littledustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM10_INDEX'];
        const tinydustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM25_INDEX'];
        const littledustNum = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM10'];
        const tinydustNum = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM25'];

        setFemalePopulationRate_6(rate);
        setMalePopulationRate_6(rate2);
        setAreaCongest_6(chaoSity);
        setAreaCongestDetail_6(chaosityDetail);
        setAgeCongest_6_10(age10);
        setAgeCongest_6_20(age20);
        setAgeCongest_6_30(age30);
        setAgeCongest_6_40(age40);
        setAgeCongest_6_50(age50);
        setAgeCongest_6_60(age60);
        setDustrate6(dustText);
        setLittle6(littledustText);
        setTiny6(tinydustText);
        setLittleNum6(littledustNum);
        setTinyNum6(tinydustNum);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    fetch(url7)
      .then(response => response.json())
      .then(data => {
        // 받은 데이터 처리
        const parsedData = JSON.parse(data.jsonObject);
        console.log(data);
        //혼잡도 정도 및 설명
        const chaoSity = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['AREA_CONGEST_LVL'];
        const chaosityDetail = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['AREA_CONGEST_MSG'];

        // 나이대
        const age10 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_10'];
        const age20 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_20'];
        const age30 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_30'];
        const age40 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_40'];
        const age50 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_50'];
        const age60 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_60'];

        // 성별
        const rate = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['FEMALE_PPLTN_RATE'];
        const rate2 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['MALE_PPLTN_RATE'];

        //통합대기환경지수
        const dustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['AIR_IDX'];
        const littledustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM10_INDEX'];
        const tinydustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM25_INDEX'];
        const littledustNum = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM10'];
        const tinydustNum = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM25'];

        setFemalePopulationRate_7(rate);
        setMalePopulationRate_7(rate2);
        setAreaCongest_7(chaoSity);
        setAreaCongestDetail_7(chaosityDetail);
        setAgeCongest_7_10(age10);
        setAgeCongest_7_20(age20);
        setAgeCongest_7_30(age30);
        setAgeCongest_7_40(age40);
        setAgeCongest_7_50(age50);
        setAgeCongest_7_60(age60);
        setDustrate7(dustText);
        setLittle7(littledustText);
        setTiny7(tinydustText);
        setLittleNum7(littledustNum);
        setTinyNum7(tinydustNum);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    fetch(url8)
      .then(response => response.json())
      .then(data => {
        // 받은 데이터 처리
        const parsedData = JSON.parse(data.jsonObject);
        console.log(data);
        //혼잡도 정도 및 설명
        const chaoSity = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['AREA_CONGEST_LVL'];
        const chaosityDetail = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['AREA_CONGEST_MSG'];

        // 나이대
        const age10 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_10'];
        const age20 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_20'];
        const age30 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_30'];
        const age40 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_40'];
        const age50 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_50'];
        const age60 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_60'];

        // 성별
        const rate = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['FEMALE_PPLTN_RATE'];
        const rate2 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['MALE_PPLTN_RATE'];

        //통합대기환경지수
        const dustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['AIR_IDX'];
        const littledustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM10_INDEX'];
        const tinydustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM25_INDEX'];
        const littledustNum = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM10'];
        const tinydustNum = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM25'];

        setFemalePopulationRate_8(rate);
        setMalePopulationRate_8(rate2);
        setAreaCongest_8(chaoSity);
        setAreaCongestDetail_8(chaosityDetail);
        setAgeCongest_8_10(age10);
        setAgeCongest_8_20(age20);
        setAgeCongest_8_30(age30);
        setAgeCongest_8_40(age40);
        setAgeCongest_8_50(age50);
        setAgeCongest_8_60(age60);
        setDustrate8(dustText);
        setLittle8(littledustText);
        setTiny8(tinydustText);
        setLittleNum8(littledustNum);
        setTinyNum8(tinydustNum);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    fetch(url9)
      .then(response => response.json())
      .then(data => {
        // 받은 데이터 처리
        const parsedData = JSON.parse(data.jsonObject);
        console.log(data);
        //혼잡도 정도 및 설명
        const chaoSity = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['AREA_CONGEST_LVL'];
        const chaosityDetail = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['AREA_CONGEST_MSG'];

        // 나이대
        const age10 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_10'];
        const age20 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_20'];
        const age30 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_30'];
        const age40 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_40'];
        const age50 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_50'];
        const age60 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_60'];

        // 성별
        const rate = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['FEMALE_PPLTN_RATE'];
        const rate2 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['MALE_PPLTN_RATE'];

        //통합대기환경지수
        const dustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['AIR_IDX'];
        const littledustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM10_INDEX'];
        const tinydustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM25_INDEX'];
        const littledustNum = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM10'];
        const tinydustNum = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM25'];

        setFemalePopulationRate_9(rate);
        setMalePopulationRate_9(rate2);
        setAreaCongest_9(chaoSity);
        setAreaCongestDetail_9(chaosityDetail);
        setAgeCongest_9_10(age10);
        setAgeCongest_9_20(age20);
        setAgeCongest_9_30(age30);
        setAgeCongest_9_40(age40);
        setAgeCongest_9_50(age50);
        setAgeCongest_9_60(age60);
        setDustrate9(dustText);
        setLittle9(littledustText);
        setTiny9(tinydustText);
        setLittleNum9(littledustNum);
        setTinyNum9(tinydustNum);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    fetch(url10)
      .then(response => response.json())
      .then(data => {
        // 받은 데이터 처리
        const parsedData = JSON.parse(data.jsonObject);
        console.log(data);
        //혼잡도 정도 및 설명
        const chaoSity = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['AREA_CONGEST_LVL'];
        const chaosityDetail = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['AREA_CONGEST_MSG'];

        // 나이대
        const age10 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_10'];
        const age20 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_20'];
        const age30 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_30'];
        const age40 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_40'];
        const age50 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_50'];
        const age60 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['PPLTN_RATE_60'];

        // 성별
        const rate = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['FEMALE_PPLTN_RATE'];
        const rate2 = parsedData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['MALE_PPLTN_RATE'];

        //통합대기환경지수
        const dustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['AIR_IDX'];
        const littledustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM10_INDEX'];
        const tinydustText = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM25_INDEX'];
        const littledustNum = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM10'];
        const tinydustNum = parsedData['SeoulRtd.citydata']['CITYDATA']['WEATHER_STTS']['WEATHER_STTS']['PM25'];

        setFemalePopulationRate_10(rate);
        setMalePopulationRate_10(rate2);
        setAreaCongest_10(chaoSity);
        setAreaCongestDetail_10(chaosityDetail);
        setAgeCongest_10_10(age10);
        setAgeCongest_10_20(age20);
        setAgeCongest_10_30(age30);
        setAgeCongest_10_40(age40);
        setAgeCongest_10_50(age50);
        setAgeCongest_10_60(age60);
        setDustrate10(dustText);
        setLittle10(littledustText);
        setTiny10(tinydustText);
        setLittleNum10(littledustNum);
        setTinyNum10(tinydustNum);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);




  //서울시 지역별로 데이터 따로 정리하시면 됩니다.
  const placeOfSeoul = {
    "가산디지털단지역": {
      //1. 혼잡도 파트
      //혼잡도
      populationStatus: `${areaCongest_1}`,
      //혼잡도에 따른 텍스트
      populationDescription: `${areaCongestDetail_1}`,
      // 나이대별 비율
      ageDistribution: [
        { ageGroup: `${ageCongest_1_10}`, value: `${ageCongest_1_10}` },//10대 
        { ageGroup: `${ageCongest_1_20}`, value: `${ageCongest_1_20}` },//20대
        { ageGroup: `${ageCongest_1_30}`, value: `${ageCongest_1_30}` },//30대
        { ageGroup: `${ageCongest_1_40}`, value: `${ageCongest_1_40}` },//40대
        { ageGroup: `${ageCongest_1_50}`, value: `${ageCongest_1_50}` },//50대
        { ageGroup: `${ageCongest_1_60}`, value: `${ageCongest_1_60}` },//60대
      ],
      //성별 비율
      genderData: [
        { gender: `${malePopulationRate_1}`, value: `${malePopulationRate_1}` },
        { gender: `${femalePopulationRate_1}`, value: `${femalePopulationRate_1}` },
      ],
      //2. 날씨 파트
      forecastData_top: [
        { emogi: 'sunny', value: 'sunny' },
        { temperature: '29.7', value: '29.7' },
      ],

      forecastData_minmax: [
        { min: '25', value: '25' },
        { max: '29', value: '29' },
      ],

      forecastData: [
        { date: '16', weather: 'clo', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '17', weather: 'ㄹㄹㄹ', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '18', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '19', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '20', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '21', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '22', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '23', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '24', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '25', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' }
      ],

      //3. 미세먼지 파트
      air_clearity: `${dustRate1}`,
      air_num: `${littleDustNum1}`,
      littledust_num: `${littleDustNum1}`,
      littledust: `${littleDust1}`,
      tinydust_num: `${tinyDustNum1}`,
      tinydust: `${tinyDust1}`
    },

    "강남역": {
      //1. 혼잡도 파트
      //혼잡도
      populationStatus: `${areaCongest_2}`,
      //혼잡도에 따른 텍스트
      populationDescription: `${areaCongestDetail_2}`,
      // 나이대별 비율
      ageDistribution: [
        { ageGroup: `${ageCongest_2_10}`, value: `${ageCongest_2_10}` },//10대 
        { ageGroup: `${ageCongest_2_20}`, value: `${ageCongest_2_20}` },//20대
        { ageGroup: `${ageCongest_2_30}`, value: `${ageCongest_2_30}` },//30대
        { ageGroup: `${ageCongest_2_40}`, value: `${ageCongest_2_40}` },//40대
        { ageGroup: `${ageCongest_2_50}`, value: `${ageCongest_2_50}` },//50대
        { ageGroup: `${ageCongest_2_60}`, value: `${ageCongest_2_60}` },//60대
      ],
      //성별 비율
      genderData: [
        { gender: `${malePopulationRate_2}`, value: `${malePopulationRate_2}` },
        { gender: `${femalePopulationRate_2}`, value: `${femalePopulationRate_2}` },
      ],
      //2. 날씨 파트
      forecastData_top: [
        { emogi: 'sunny', value: 'sunny' },
        { temperature: '29.7', value: '29.7' },
      ],

      forecastData_minmax: [
        { min: '25', value: '25' },
        { max: '29', value: '29' },
      ],

      forecastData: [
        { date: '16', weather: 'clo', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '17', weather: 'ㄹㄹㄹ', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '18', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '19', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '20', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '21', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '22', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '23', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '24', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '25', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' }
      ],

      //3. 미세먼지 파트
      air_clearity: `${dustRate2}`,
      air_num: `${littleDustNum2}`,
      littledust_num: `${littleDustNum2}`,
      littledust: `${littleDust2}`,
      tinydust_num: `${tinyDustNum2}`,
      tinydust: `${tinyDust2}`
    },

    "서울역": {
      //1. 혼잡도 파트
      //혼잡도
      populationStatus: `${areaCongest_3}`,
      //혼잡도에 따른 텍스트
      populationDescription: `${areaCongestDetail_3}`,
      // 나이대별 비율
      ageDistribution: [
        { ageGroup: `${ageCongest_3_10}`, value: `${ageCongest_3_10}` },//10대 
        { ageGroup: `${ageCongest_3_20}`, value: `${ageCongest_3_20}` },//20대
        { ageGroup: `${ageCongest_3_30}`, value: `${ageCongest_3_30}` },//30대
        { ageGroup: `${ageCongest_3_40}`, value: `${ageCongest_3_40}` },//40대
        { ageGroup: `${ageCongest_3_50}`, value: `${ageCongest_3_50}` },//50대
        { ageGroup: `${ageCongest_3_60}`, value: `${ageCongest_3_60}` },//60대
      ],
      //성별 비율
      genderData: [
        { gender: `${malePopulationRate_3}`, value: `${malePopulationRate_3}` },
        { gender: `${femalePopulationRate_3}`, value: `${femalePopulationRate_3}` },
      ],
      //2. 날씨 파트
      forecastData_top: [
        { emogi: 'sunny', value: 'sunny' },
        { temperature: '29.7', value: '29.7' },
      ],

      forecastData_minmax: [
        { min: '25', value: '25' },
        { max: '29', value: '29' },
      ],

      forecastData: [
        { date: '16', weather: 'clo', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '17', weather: 'ㄹㄹㄹ', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '18', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '19', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '20', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '21', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '22', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '23', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '24', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '25', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' }
      ],

      //3. 미세먼지 파트
      air_clearity: `${dustRate3}`,
      air_num: `${littleDustNum3}`,
      littledust_num: `${littleDustNum3}`,
      littledust: `${littleDust3}`,
      tinydust_num: `${tinyDustNum3}`,
      tinydust: `${tinyDust3}`
    },

    "성수 카페거리": {
      //1. 혼잡도 파트
      //혼잡도
      populationStatus: `${areaCongest_4}`,
      //혼잡도에 따른 텍스트
      populationDescription: `${areaCongestDetail_4}`,
      // 나이대별 비율
      ageDistribution: [
        { ageGroup: `${ageCongest_4_10}`, value: `${ageCongest_4_10}` },//10대 
        { ageGroup: `${ageCongest_4_20}`, value: `${ageCongest_4_20}` },//20대
        { ageGroup: `${ageCongest_4_30}`, value: `${ageCongest_4_30}` },//30대
        { ageGroup: `${ageCongest_4_40}`, value: `${ageCongest_4_40}` },//40대
        { ageGroup: `${ageCongest_4_50}`, value: `${ageCongest_4_50}` },//50대
        { ageGroup: `${ageCongest_4_60}`, value: `${ageCongest_4_60}` },//60대
      ],
      //성별 비율
      genderData: [
        { gender: `${malePopulationRate_4}`, value: `${malePopulationRate_4}` },
        { gender: `${femalePopulationRate_4}`, value: `${femalePopulationRate_4}` },
      ],
      //2. 날씨 파트
      forecastData_top: [
        { emogi: 'sunny', value: 'sunny' },
        { temperature: '29.7', value: '29.7' },
      ],

      forecastData_minmax: [
        { min: '25', value: '25' },
        { max: '29', value: '29' },
      ],

      forecastData: [
        { date: '16', weather: 'clo', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '17', weather: 'ㄹㄹㄹ', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '18', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '19', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '20', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '21', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '22', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '23', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '24', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '25', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' }
      ],

      //3. 미세먼지 파트
      air_clearity: `${dustRate4}`,
      air_num: `${littleDustNum4}`,
      littledust_num: `${littleDustNum4}`,
      littledust: `${littleDust4}`,
      tinydust_num: `${tinyDustNum4}`,
      tinydust: `${tinyDust4}`
    },

    "시청광장": {
      //1. 혼잡도 파트
      //혼잡도
      populationStatus: `${areaCongest_5}`,
      //혼잡도에 따른 텍스트
      populationDescription: `${areaCongestDetail_5}`,
      // 나이대별 비율
      ageDistribution: [
        { ageGroup: `${ageCongest_5_10}`, value: `${ageCongest_5_10}` },//10대 
        { ageGroup: `${ageCongest_5_20}`, value: `${ageCongest_5_20}` },//20대
        { ageGroup: `${ageCongest_5_30}`, value: `${ageCongest_5_30}` },//30대
        { ageGroup: `${ageCongest_5_40}`, value: `${ageCongest_5_40}` },//40대
        { ageGroup: `${ageCongest_5_50}`, value: `${ageCongest_5_50}` },//50대
        { ageGroup: `${ageCongest_5_60}`, value: `${ageCongest_5_60}` },//60대
      ],
      //성별 비율
      genderData: [
        { gender: `${malePopulationRate_5}`, value: `${malePopulationRate_5}` },
        { gender: `${femalePopulationRate_5}`, value: `${femalePopulationRate_5}` },
      ],
      //2. 날씨 파트
      forecastData_top: [
        { emogi: 'sunny', value: 'sunny' },
        { temperature: '29.7', value: '29.7' },
      ],

      forecastData_minmax: [
        { min: '25', value: '25' },
        { max: '29', value: '29' },
      ],

      forecastData: [
        { date: '16', weather: 'clo', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '17', weather: 'ㄹㄹㄹ', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '18', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '19', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '20', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '21', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '22', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '23', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '24', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '25', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' }
      ],

      //3. 미세먼지 파트
      air_clearity: `${dustRate5}`,
      air_num: `${littleDustNum5}`,
      littledust_num: `${littleDustNum5}`,
      littledust: `${littleDust5}`,
      tinydust_num: `${tinyDustNum5}`,
      tinydust: `${tinyDust5}`
    },


    "신촌 이대역": {
      //1. 혼잡도 파트
      //혼잡도
      populationStatus: `${areaCongest_6}`,
      //혼잡도에 따른 텍스트
      populationDescription: `${areaCongestDetail_6}`,
      // 나이대별 비율
      ageDistribution: [
        { ageGroup: `${ageCongest_6_10}`, value: `${ageCongest_6_10}` },//10대 
        { ageGroup: `${ageCongest_6_20}`, value: `${ageCongest_6_20}` },//20대
        { ageGroup: `${ageCongest_6_30}`, value: `${ageCongest_6_30}` },//30대
        { ageGroup: `${ageCongest_6_40}`, value: `${ageCongest_6_40}` },//40대
        { ageGroup: `${ageCongest_6_50}`, value: `${ageCongest_6_50}` },//50대
        { ageGroup: `${ageCongest_6_60}`, value: `${ageCongest_6_60}` },//60대
      ],
      //성별 비율
      genderData: [
        { gender: `${malePopulationRate_6}`, value: `${malePopulationRate_6}` },
        { gender: `${femalePopulationRate_6}`, value: `${femalePopulationRate_6}` },
      ],
      //2. 날씨 파트
      forecastData_top: [
        { emogi: 'sunny', value: 'sunny' },
        { temperature: '29.7', value: '29.7' },
      ],

      forecastData_minmax: [
        { min: '25', value: '25' },
        { max: '29', value: '29' },
      ],

      forecastData: [
        { date: '16', weather: 'clo', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '17', weather: 'ㄹㄹㄹ', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '18', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '19', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '20', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '21', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '22', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '23', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '24', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '25', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' }
      ],

      //3. 미세먼지 파트
      air_clearity: `${dustRate6}`,
      air_num: `${littleDustNum6}`,
      littledust_num: `${littleDustNum6}`,
      littledust: `${littleDust6}`,
      tinydust_num: `${tinyDustNum6}`,
      tinydust: `${tinyDust6}`
    },


    "여의도": {
      //1. 혼잡도 파트
      //혼잡도
      populationStatus: `${areaCongest_7}`,
      //혼잡도에 따른 텍스트
      populationDescription: `${areaCongestDetail_7}`,
      // 나이대별 비율
      ageDistribution: [
        { ageGroup: `${ageCongest_7_10}`, value: `${ageCongest_7_10}` },//10대 
        { ageGroup: `${ageCongest_7_20}`, value: `${ageCongest_7_20}` },//20대
        { ageGroup: `${ageCongest_7_30}`, value: `${ageCongest_7_30}` },//30대
        { ageGroup: `${ageCongest_7_40}`, value: `${ageCongest_7_40}` },//40대
        { ageGroup: `${ageCongest_7_50}`, value: `${ageCongest_7_50}` },//50대
        { ageGroup: `${ageCongest_7_60}`, value: `${ageCongest_7_60}` },//60대
      ],
      //성별 비율
      genderData: [
        { gender: `${malePopulationRate_7}`, value: `${malePopulationRate_7}` },
        { gender: `${femalePopulationRate_7}`, value: `${femalePopulationRate_7}` },
      ],
      //2. 날씨 파트
      forecastData_top: [
        { emogi: 'sunny', value: 'sunny' },
        { temperature: '29.7', value: '29.7' },
      ],

      forecastData_minmax: [
        { min: '25', value: '25' },
        { max: '29', value: '29' },
      ],

      forecastData: [
        { date: '16', weather: 'clo', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '17', weather: 'ㄹㄹㄹ', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '18', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '19', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '20', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '21', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '22', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '23', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '24', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '25', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' }
      ],

      //3. 미세먼지 파트
      air_clearity: `${dustRate7}`,
      air_num: `${littleDustNum7}`,
      littledust_num: `${littleDustNum7}`,
      littledust: `${littleDust7}`,
      tinydust_num: `${tinyDustNum7}`,
      tinydust: `${tinyDust7}`
    },

    "잠실종합운동장": {
      //1. 혼잡도 파트
      //혼잡도
      populationStatus: `${areaCongest_8}`,
      //혼잡도에 따른 텍스트
      populationDescription: `${areaCongestDetail_8}`,
      // 나이대별 비율
      ageDistribution: [
        { ageGroup: `${ageCongest_8_10}`, value: `${ageCongest_8_10}` },//10대 
        { ageGroup: `${ageCongest_8_20}`, value: `${ageCongest_8_20}` },//20대
        { ageGroup: `${ageCongest_8_30}`, value: `${ageCongest_8_30}` },//30대
        { ageGroup: `${ageCongest_8_40}`, value: `${ageCongest_8_40}` },//40대
        { ageGroup: `${ageCongest_8_50}`, value: `${ageCongest_8_50}` },//50대
        { ageGroup: `${ageCongest_8_60}`, value: `${ageCongest_8_60}` },//60대
      ],
      //성별 비율
      genderData: [
        { gender: `${malePopulationRate_8}`, value: `${malePopulationRate_8}` },
        { gender: `${femalePopulationRate_8}`, value: `${femalePopulationRate_8}` },
      ],
      //2. 날씨 파트
      forecastData_top: [
        { emogi: 'sunny', value: 'sunny' },
        { temperature: '29.7', value: '29.7' },
      ],

      forecastData_minmax: [
        { min: '25', value: '25' },
        { max: '29', value: '29' },
      ],

      forecastData: [
        { date: '16', weather: 'clo', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '17', weather: 'ㄹㄹㄹ', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '18', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '19', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '20', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '21', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '22', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '23', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '24', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '25', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' }
      ],

      //3. 미세먼지 파트
      air_clearity: `${dustRate8}`,
      air_num: `${littleDustNum8}`,
      littledust_num: `${littleDustNum8}`,
      littledust: `${littleDust8}`,
      tinydust_num: `${tinyDustNum8}`,
      tinydust: `${tinyDust8}`
    },
    "창덕궁 종묘": {
      //1. 혼잡도 파트
      //혼잡도
      populationStatus: `${areaCongest_9}`,
      //혼잡도에 따른 텍스트
      populationDescription: `${areaCongestDetail_9}`,
      // 나이대별 비율
      ageDistribution: [
        { ageGroup: `${ageCongest_9_10}`, value: `${ageCongest_9_10}` },//10대 
        { ageGroup: `${ageCongest_9_20}`, value: `${ageCongest_9_20}` },//20대
        { ageGroup: `${ageCongest_9_30}`, value: `${ageCongest_9_30}` },//30대
        { ageGroup: `${ageCongest_9_40}`, value: `${ageCongest_9_40}` },//40대
        { ageGroup: `${ageCongest_9_50}`, value: `${ageCongest_9_50}` },//50대
        { ageGroup: `${ageCongest_9_60}`, value: `${ageCongest_9_60}` },//60대
      ],
      //성별 비율
      genderData: [
        { gender: `${malePopulationRate_9}`, value: `${malePopulationRate_9}` },
        { gender: `${femalePopulationRate_9}`, value: `${femalePopulationRate_9}` },
      ],
      //2. 날씨 파트
      forecastData_top: [
        { emogi: 'sunny', value: 'sunny' },
        { temperature: '29.7', value: '29.7' },
      ],
      forecastData_minmax: [
        { min: '25', value: '25' },
        { max: '29', value: '29' },
      ],
      forecastData: [
        { date: '16', weather: 'clo', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '17', weather: 'ㄹㄹㄹ', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '18', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '19', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '20', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '21', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '22', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '23', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '24', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '25', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' }
      ],
      //3. 미세먼지 파트
      air_clearity: `${dustRate9}`,
      air_num: `${littleDustNum9}`,
      littledust_num: `${littleDustNum9}`,
      littledust: `${littleDust9}`,
      tinydust_num: `${tinyDustNum9}`,
      tinydust: `${tinyDust9}`
    },


    "홍대입구역 9번 출구": {
      //1. 혼잡도 파트
      //혼잡도
      populationStatus: `${areaCongest_10}`,
      //혼잡도에 따른 텍스트
      populationDescription: `${areaCongestDetail_10}`,
      // 나이대별 비율
      ageDistribution: [
        { ageGroup: `${ageCongest_10_10}`, value: `${ageCongest_10_10}` },//10대 
        { ageGroup: `${ageCongest_10_20}`, value: `${ageCongest_10_20}` },//20대
        { ageGroup: `${ageCongest_10_30}`, value: `${ageCongest_10_30}` },//30대
        { ageGroup: `${ageCongest_10_40}`, value: `${ageCongest_10_40}` },//40대
        { ageGroup: `${ageCongest_10_50}`, value: `${ageCongest_10_50}` },//50대
        { ageGroup: `${ageCongest_10_60}`, value: `${ageCongest_10_60}` },//60대
      ],
      //성별 비율
      genderData: [
        { gender: `${malePopulationRate_10}`, value: `${malePopulationRate_10}` },
        { gender: `${femalePopulationRate_10}`, value: `${femalePopulationRate_10}` },
      ],
      //2. 날씨 파트
      forecastData_top: [
        { emogi: 'sunny', value: 'sunny' },
        { temperature: '29.7', value: '29.7' },
      ],

      forecastData_minmax: [
        { min: '99', value: '25' },
        { max: '99', value: '29' },
      ],

      forecastData: [
        { date: '16', weather: 'clo', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '17', weather: 'ㄹㄹㄹ', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '18', weather: 'ㄷㄷㄷ', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '19', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '20', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '21', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '22', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '23', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '24', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
        { date: '25', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' }
      ],

      //3. 미세먼지 파트
      air_clearity: `${dustRate10}`,
      air_num: `${littleDustNum10}`,
      littledust_num: `${littleDustNum10}`,
      littledust: `${littleDust10}`,
      tinydust_num: `${tinyDustNum10}`,
      tinydust: `${tinyDust10}`
    },


  }

  console.log(user ? `Hello, ${user.name}` : 'You are not logged in'); //카카오 로그인 정보 가져오기  

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
  const [selectedDropdown1, setSelectedDropdown1] = useState("가산디지털단지역");
  const [dropdownOpen1, setDropdownOpen1] = useState(false);

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



  const handleDropdown1Item = (item) => {
    setSelectedDropdown1(item);
    setSeoulPlace(item);
    setDropdownOpen1(false);
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
  const StyledChaos = styled.div`
  color: ${(props) => {
      switch (props.status) {
        case '여유':
          return '#00E92A';
        case '보통':
          return `#FFD600;`;
        case '약간 붐빔':
          return '#FF9900';
        case '붐빔':
          return '#E80000';
        default:
          return 'black';
      }
    }};
`;

  const ChaosEmoji = ({ status }) => {
    switch (status) {
      case '여유':
        return <GoodEmoji />;
      case '보통':
        return <AverageEmoji />;
      case '약간 붐빔':
        return <LittleDizzyEmoji />;
      case '붐빔':
        return <DizzyEmoji />;
      default:
        return; // 혹은 기본값 아이콘
    }
  };

  const StyledAirState = styled.div`
  color: ${(props) => {
      switch (props.status) {
        case '좋음':
          return '#00E92A';
        case '보통':
          return `#FFD600;`;
        case '나쁨':
          return '#FF9900';
        case '매우나쁨':
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
        case '나쁨':
          return '#FF9900';
        case '매우나쁨':
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
        case '나쁨':
          return '#FF9900';
        case '매우나쁨':
          return '#E80000';
        default:
          return 'black';
      }
    }};
`;

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
  const selectedData = placeOfSeoul[seoulPlace];

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

                  <div className='emoji'><ChaosEmoji status={selectedData.populationStatus} /></div>
                  <StyledChaos className='dizzyness' status={selectedData.populationStatus}>{selectedData.populationStatus}</StyledChaos>
                </div>
                <div>{(() => {
                switch (selectedData.populationStatus) {
                    case '여유': return <div className='diz_text'>{selectedData.populationDescription}</div>;
                    case '보통': return <div className='diz_text2'>{selectedData.populationDescription}</div>;
                    case '약간 붐빔': return <div className='diz_text3'>{selectedData.populationDescription}</div>;
                    case '붐빔': return <div className='diz_text4'>{selectedData.populationDescription}</div>;
                    default: return null;
                }
            })()}</div>
              </div>
            </div>
            <div className='age'>
              <div className='age_top'></div>
              <div className='age_text'>연령대별 비율</div>
              <div className='age_bottom'>

                <AgePieChart data={selectedData.ageDistribution} width={200} height={200} />
                <div className='age_detail'>
                  <First /><span className='a_text'>10대</span>
                  <Second /><span className='a_text'>20대</span>
                  <Third /><span className='a_text'>30대</span>
                  <Fourth /><span className='a_text'>40대</span>
                  <Fifth /><span className='a_text'>50대</span>
                  <Sixth /><span className='a_text'>60대</span>
                </div>
              </div>
            </div>
            <div className='gender'>
              <div className='gender_text'>성별 비율</div>
              <div className='gender_bottom'>
                <div className='male_gender'>
                  <Male className='male_icon' /><span className='male_text'>남성</span>
                </div>

                <div className='genderbutton'><GenderPieChart data={selectedData.genderData} width={200} height={200} /></div>
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


            <div
              style={{
                position: 'absolute',
                top: '65px',
                left: '138px',
                height: '88px',
                weight: '88px',
              }}
            >
              {selectedData.forecastData_top.map((data) =>
                data.value === 'sunny' ? (
                  <img src={sunnyIcon1} alt="sunny" width="88px" height="88px" />
                ) : null
              )}
            </div>

            <div
              style={{
                position: 'absolute',
                top: '184px',
                left: '136px',
                height: '29px',
                width: '91px',
                color: '#000',
                fontFamily: 'Inter',
                fontSize: '24px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
                textAlign: 'center',
              }}
            >
              {selectedData.forecastData_top[1].temperature}  °C
            </div>

            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '9.4px',
                height: '12px',
                width: '103px',
                textAlign: 'center',
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
                top: '251px',
                left: '111px',
                height: '17px',
                width: '38px',
                textAlign: 'center',
                color: '#000',
                fontFamily: 'Inter',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              {selectedData.forecastData_minmax[0].min} °C
            </div>
            <div
              style={{
                position: 'absolute',
                top: '251px',
                left: '293px',
                height: '17px',
                width: '38px',
                textAlign: 'center',
                color: '#000',
                fontFamily: 'Inter',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              {selectedData.forecastData_minmax[1].max} °C
            </div>

            <div
              style={{
                position: 'absolute',
                top: '251px',
                left: '33px',
                height: '17px',
                width: '56px',
                textAlign: 'center',
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
                top: '251px',
                left: '215px',
                height: '17px',
                width: '56px',
                textAlign: 'center',
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
                top: '247px',
                left: '183px',
                height: '25px',
                width: '1px',
                background: '#000',
              }}
            ></div>

            <div
              style={{
                position: 'absolute',
                top: '343px',
                left: '17px',
                height: '24px',
                width: '160px',
                textAlign: 'center',
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


            <div
              style={{
                position: 'absolute',
                top: '389px',
                left: '14px',
              }}
            >
              <ForecastTable forecastData={selectedData.forecastData} />
            </div>


          </div>


        );
      case 'dust'://dust 부분
        return (
          <div className='detail-view2'>
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '9.4px',
                height: '12px',
                width: '103px',
                textAlign: 'center',
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
            <div>
              <div className='airpollution_state'>
                <div className='air_text'>통합대기환경지수</div>
                <StyledAirState className='air_state' status={selectedData.air_clearity}>{selectedData.air_clearity}</StyledAirState>
              </div>
              <div className='graph'>
                <div className='marker'>
            {(() => {
                switch (selectedData.air_clearity) {
                    case '좋음': return <AirMarker_Green className='marker1'/>;
                    case '보통': return <AirMarker_Yellow className='marker2'/>;
                    case '나쁨': return <AirMarker_Orange className='marker3'/>;
                    case '매우나쁨': return <AirMarker_Red className='marker4'/>;
                    default: return null;
                }
            })()}
        </div>
                <div className='air_graph'><Green /><Yellow /><Orange /><Red /></div>
              </div>
            </div>
            <div className='air_detail_data'>
              <div className='little_dust'>
                <div className='little_text'>미세먼지</div>
                <StyledLittleDust className='little_state' status={selectedData.littledust}>{selectedData.littledust_num}㎍/㎥ {selectedData.littledust}</StyledLittleDust>
              </div>
              <div className='tiny_dust'>
                <div className='tiny_text'>초미세먼지</div>
                <StyledTinyDust className='tiny_state' status={selectedData.tinydust}>{selectedData.tinydust_num}㎍/㎥ {selectedData.tinydust}</StyledTinyDust>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='view'>
      <div className='top-view'>
        <div className='top-image' onClick={() => navigate('/mypage')}><Image1 /></div>
        <div className='logo'><Dencity /></div>
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
                    <div className="dropdown-item1" onClick={() => handleDropdown1Item("가산디지털단지역")}>가산디지털단지역</div>
                    <div className="dropdown-item1" onClick={() => handleDropdown1Item("강남역")}>강남역</div>
                    <div className="dropdown-item1" onClick={() => handleDropdown1Item("서울역")}>서울역</div>
                    <div className="dropdown-item1" onClick={() => handleDropdown1Item("성수 카페거리")}>성수 카페거리</div>
                    <div className="dropdown-item1" onClick={() => handleDropdown1Item("시청광장")}>시청광장</div>
                    <div className="dropdown-item1" onClick={() => handleDropdown1Item("신촌 이대역")}>신촌 이대역</div>
                    <div className="dropdown-item1" onClick={() => handleDropdown1Item("여의도")}>여의도</div>
                    <div className="dropdown-item1" onClick={() => handleDropdown1Item("잠실종합운동장")}>잠실종합운동장</div>
                    <div className="dropdown-item1" onClick={() => handleDropdown1Item("창덕궁 종묘")}>창덕궁 종묘</div>
                    <div className="dropdown-item1" onClick={() => handleDropdown1Item("홍대입구역 9번 출구")}>홍대입구역 9번 출구</div>
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
            {loading ? (
          <div className="loading-indicator"><Dencity className='loading-logo'/></div>
        ) : (
            renderDetailView()
          
        )}
      </div>
    </div>
  );
  
}

export default MainPage;