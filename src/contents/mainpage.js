import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
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
import { ReactComponent as LittleDizzyEmoji } from './images/LittleDizzy.svg';
import { ReactComponent as AverageEmoji } from './images/Average.svg';
import { ReactComponent as GoodEmoji } from './images/Good.svg';
import { ReactComponent as CommunityFloat } from './images/commu_float.svg';
import { ReactComponent as Zero } from './images/10대 이하.svg';
import { ReactComponent as First } from './images/10대.svg';
import { ReactComponent as Second } from './images/20대.svg';
import { ReactComponent as Third } from './images/30대.svg';
import { ReactComponent as Fourth } from './images/40대.svg';
import { ReactComponent as Fifth } from './images/50대.svg';
import { ReactComponent as Sixth } from './images/60대.svg';
import { ReactComponent as Seventh } from './images/70대 이상.svg';
import { ReactComponent as Male } from './images/male.svg';
import { ReactComponent as Female } from './images/female.svg';
import { ReactComponent as Red } from './images/red.svg';
import { ReactComponent as Green } from './images/green.svg';
import { ReactComponent as Yellow } from './images/yellow.svg';
import { ReactComponent as Orange } from './images/orange.svg';
import { ReactComponent as AirMarker_Yellow } from './images/air_marker_Y.svg';
import { ReactComponent as Dencity } from './images/Dencity.svg';
import sunnyIcon from './images/sunny.svg';
import ForecastTable from './ForecastTable';
import axios from 'axios';
//commit check
function MainPage() {
  const navigate = useNavigate();
  axios.get('https://54.180.87.174')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });

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


  //서울시 지역별로 데이터 따로 정리하시면 됩니다.
  const placeOfSeoul = {
    "창덕궁 종묘": {
      //1. 혼잡도 파트
      //혼잡도
      populationStatus: '혼잡',
      //혼잡도에 따른 텍스트
      populationDescription: '사람이 몰려있을 가능성이 매우 크고 많이 붐빈다고 느낄 수 있어요. 인구밀도가 높은 구간에서는 도보 이동시 부딪힘이 발생할 수 있어요.',
      // 나이대별 비율
      ageDistribution: [
        { ageGroup: '13.5%', value: 13.5 },//0-10대
        { ageGroup: '12.4%', value: 12.4 },//10대 
        { ageGroup: '11.2%', value: 11.2 },//20대
        { ageGroup: '14.1%', value: 14.1 },//30대
        { ageGroup: '9.3%', value: 9.3 },//40대
        { ageGroup: '10.9%', value: 10.9 },//50대
        { ageGroup: '15.3%', value: 15.3 },//60대
        { ageGroup: '13.3%', value: 13.3 },//70대 이상
      ],
      //성별 비율
      genderData: [
        { gender: '40.6%', value: 40.6 },
        { gender: '59.4', value: 59.4 },
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
      air_clearity: '보통',
      air_num: 30,
      littledust_num: 23,
      littledust: '좋음',
      tinydust_num: 17,
      tinydust: '보통'
    },

    "가산디지털단지역": {
      //1. 혼잡도 파트
      //혼잡도
      populationStatus: '보통',
      //혼잡도에 따른 텍스트
      populationDescription: '놀러가고 싶음 ㄹㅇ.',
      // 나이대별 비율
      ageDistribution: [
        { ageGroup: '13.5%', value: 13.5 },//0-10대
        { ageGroup: '12.4%', value: 12.4 },//10대 
        { ageGroup: '11.2%', value: 11.2 },//20대
        { ageGroup: '14.1%', value: 14.1 },//30대
        { ageGroup: '9.3%', value: 9.3 },//40대
        { ageGroup: '10.9%', value: 10.9 },//50대
        { ageGroup: '15.3%', value: 15.3 },//60대
        { ageGroup: '13.3%', value: 13.3 },//70대 이상
      ],
      //성별 비율
      genderData: [
        { gender: '40.6%', value: 40.6 },
        { gender: '59.4', value: 59.4 },
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
      air_clearity: '보통',
      air_num: 30,
      littledust_num: 23,
      littledust: '좋음',
      tinydust_num: 17,
      tinydust: '보통'
    },

    "강남역": {
      //1. 혼잡도 파트
      //혼잡도
      populationStatus: '보통',
      //혼잡도에 따른 텍스트
      populationDescription: '놀러가고 싶음 ㄹㅇ.',
      // 나이대별 비율
      ageDistribution: [
        { ageGroup: '13.5%', value: 13.5 },//0-10대
        { ageGroup: '12.4%', value: 12.4 },//10대 
        { ageGroup: '11.2%', value: 11.2 },//20대
        { ageGroup: '14.1%', value: 14.1 },//30대
        { ageGroup: '9.3%', value: 9.3 },//40대
        { ageGroup: '10.9%', value: 10.9 },//50대
        { ageGroup: '15.3%', value: 15.3 },//60대
        { ageGroup: '13.3%', value: 13.3 },//70대 이상
      ],
      //성별 비율
      genderData: [
        { gender: '40.6%', value: 40.6 },
        { gender: '59.4', value: 59.4 },
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
      air_clearity: '보통',
      air_num: 30,
      littledust_num: 23,
      littledust: '좋음',
      tinydust_num: 17,
      tinydust: '보통'
    },

    "서울역": {
      //1. 혼잡도 파트
      //혼잡도
      populationStatus: '보통',
      //혼잡도에 따른 텍스트
      populationDescription: '놀러가고 싶음 ㄹㅇ.',
      // 나이대별 비율
      ageDistribution: [
        { ageGroup: '13.5%', value: 13.5 },//0-10대
        { ageGroup: '12.4%', value: 12.4 },//10대 
        { ageGroup: '11.2%', value: 11.2 },//20대
        { ageGroup: '14.1%', value: 14.1 },//30대
        { ageGroup: '9.3%', value: 9.3 },//40대
        { ageGroup: '10.9%', value: 10.9 },//50대
        { ageGroup: '15.3%', value: 15.3 },//60대
        { ageGroup: '13.3%', value: 13.3 },//70대 이상
      ],
      //성별 비율
      genderData: [
        { gender: '40.6%', value: 40.6 },
        { gender: '59.4', value: 59.4 },
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
      air_clearity: '보통',
      air_num: 30,
      littledust_num: 23,
      littledust: '좋음',
      tinydust_num: 17,
      tinydust: '보통'
    },

    "성수 카페거리": {
      //1. 혼잡도 파트
      //혼잡도
      populationStatus: '약간 혼잡',
      //혼잡도에 따른 텍스트
      populationDescription: '사람이 몰려있을 가능성이 매우 크고 많이 붐빈다고 느낄 수 있어요. 인구밀도가 높은 구간에서는 도보 이동시 부딪힘이 발생할 수 있어요.',
      // 나이대별 비율
      ageDistribution: [
        { ageGroup: '13.5%', value: 13.5 },//0-10대
        { ageGroup: '12.4%', value: 12.4 },//10대 
        { ageGroup: '11.2%', value: 11.2 },//20대
        { ageGroup: '14.1%', value: 14.1 },//30대
        { ageGroup: '9.3%', value: 9.3 },//40대
        { ageGroup: '10.9%', value: 10.9 },//50대
        { ageGroup: '15.3%', value: 15.3 },//60대
        { ageGroup: '13.3%', value: 13.3 },//70대 이상
      ],
      //성별 비율
      genderData: [
        { gender: '40.6%', value: 40.6 },
        { gender: '59.4', value: 59.4 },
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
      air_clearity: '보통',
      air_num: 30,
      littledust_num: 23,
      littledust: '좋음',
      tinydust_num: 17,
      tinydust: '보통'
    },

    "시청광장": {
      //1. 혼잡도 파트
      //혼잡도
      populationStatus: '약간 혼잡',
      //혼잡도에 따른 텍스트
      populationDescription: '사람이 몰려있을 가능성이 매우 크고 많이 붐빈다고 느낄 수 있어요. 인구밀도가 높은 구간에서는 도보 이동시 부딪힘이 발생할 수 있어요.',
      // 나이대별 비율
      ageDistribution: [
        { ageGroup: '13.5%', value: 13.5 },//0-10대
        { ageGroup: '12.4%', value: 12.4 },//10대 
        { ageGroup: '11.2%', value: 11.2 },//20대
        { ageGroup: '14.1%', value: 14.1 },//30대
        { ageGroup: '9.3%', value: 9.3 },//40대
        { ageGroup: '10.9%', value: 10.9 },//50대
        { ageGroup: '15.3%', value: 15.3 },//60대
        { ageGroup: '13.3%', value: 13.3 },//70대 이상
      ],
      //성별 비율
      genderData: [
        { gender: '40.6%', value: 40.6 },
        { gender: '59.4', value: 59.4 },
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
      air_clearity: '보통',
      air_num: 30,
      littledust_num: 23,
      littledust: '좋음',
      tinydust_num: 17,
      tinydust: '보통'
    },

    "신촌 이대역": {
      //1. 혼잡도 파트
      //혼잡도
      populationStatus: '약간 혼잡',
      //혼잡도에 따른 텍스트
      populationDescription: '사람이 몰려있을 가능성이 매우 크고 많이 붐빈다고 느낄 수 있어요. 인구밀도가 높은 구간에서는 도보 이동시 부딪힘이 발생할 수 있어요.',
      // 나이대별 비율
      ageDistribution: [
        { ageGroup: '13.5%', value: 13.5 },//0-10대
        { ageGroup: '12.4%', value: 12.4 },//10대 
        { ageGroup: '11.2%', value: 11.2 },//20대
        { ageGroup: '14.1%', value: 14.1 },//30대
        { ageGroup: '9.3%', value: 9.3 },//40대
        { ageGroup: '10.9%', value: 10.9 },//50대
        { ageGroup: '15.3%', value: 15.3 },//60대
        { ageGroup: '13.3%', value: 13.3 },//70대 이상
      ],
      //성별 비율
      genderData: [
        { gender: '40.6%', value: 40.6 },
        { gender: '59.4', value: 59.4 },
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
      air_clearity: '보통',
      air_num: 30,
      littledust_num: 23,
      littledust: '좋음',
      tinydust_num: 17,
      tinydust: '보통'
    },

    "여의도": {
      //1. 혼잡도 파트
      //혼잡도
      populationStatus: 'ㅋㅋㅋ',
      //혼잡도에 따른 텍스트
      populationDescription: '사람이 몰려있을 가능성이 매우 크고 많이 붐빈다고 느낄 수 있어요. 인구밀도가 높은 구간에서는 도보 이동시 부딪힘이 발생할 수 있어요.',
      // 나이대별 비율
      ageDistribution: [
        { ageGroup: '13.5%', value: 13.5 },//0-10대
        { ageGroup: '12.4%', value: 12.4 },//10대 
        { ageGroup: '11.2%', value: 11.2 },//20대
        { ageGroup: '14.1%', value: 14.1 },//30대
        { ageGroup: '9.3%', value: 9.3 },//40대
        { ageGroup: '10.9%', value: 10.9 },//50대
        { ageGroup: '15.3%', value: 15.3 },//60대
        { ageGroup: '13.3%', value: 13.3 },//70대 이상
      ],
      //성별 비율
      genderData: [
        { gender: '40.6%', value: 40.6 },
        { gender: '59.4', value: 59.4 },
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
      air_clearity: '보통',
      air_num: 30,
      littledust_num: 23,
      littledust: '좋음',
      tinydust_num: 17,
      tinydust: '보통'
    },

    "잠실종합운동장": {
      //1. 혼잡도 파트
      //혼잡도
      populationStatus: 'ㅋㅋㅋ',
      //혼잡도에 따른 텍스트
      populationDescription: '사람이 몰려있을 가능성이 매우 크고 많이 붐빈다고 느낄 수 있어요. 인구밀도가 높은 구간에서는 도보 이동시 부딪힘이 발생할 수 있어요.',
      // 나이대별 비율
      ageDistribution: [
        { ageGroup: '13.5%', value: 13.5 },//0-10대
        { ageGroup: '12.4%', value: 12.4 },//10대 
        { ageGroup: '11.2%', value: 11.2 },//20대
        { ageGroup: '14.1%', value: 14.1 },//30대
        { ageGroup: '9.3%', value: 9.3 },//40대
        { ageGroup: '10.9%', value: 10.9 },//50대
        { ageGroup: '15.3%', value: 15.3 },//60대
        { ageGroup: '13.3%', value: 13.3 },//70대 이상
      ],
      //성별 비율
      genderData: [
        { gender: '40.6%', value: 40.6 },
        { gender: '59.4', value: 59.4 },
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
      air_clearity: '보통',
      air_num: 30,
      littledust_num: 23,
      littledust: '좋음',
      tinydust_num: 17,
      tinydust: '보통'
    },



    "홍대입구역 9번 출구": {
      //1. 혼잡도 파트
      //혼잡도
      populationStatus: '여유',
      //혼잡도에 따른 텍스트
      populationDescription: '사람이 몰려있을 가능성이 매우 크고 많이 붐빈다고 느낄 수 있어요. 인구밀도가 높은 구간에서는 도보 이동시 부딪힘이 발생할 수 있어요.',
      // 나이대별 비율
      ageDistribution: [
        { ageGroup: '13.5%', value: 13.5 },//0-10대
        { ageGroup: '12.4%', value: 12.4 },//10대 
        { ageGroup: '11.2%', value: 11.2 },//20대
        { ageGroup: '14.1%', value: 14.1 },//30대
        { ageGroup: '9.3%', value: 9.3 },//40대
        { ageGroup: '10.9%', value: 10.9 },//50대
        { ageGroup: '15.3%', value: 15.3 },//60대
        { ageGroup: '13.3%', value: 13.3 },//70대 이상
      ],
      //성별 비율
      genderData: [
        { gender: '40.6%', value: 40.6 },
        { gender: '59.4', value: 59.4 },
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
      air_clearity: '보통',
      air_num: 30,
      littledust_num: 23,
      littledust: '좋음',
      tinydust_num: 17,
      tinydust: '보통'
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
        case '약간 혼잡':
          return '#FF9900';
        case '혼잡':
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
      case '약간 혼잡':
        return <LittleDizzyEmoji />;
      case '혼잡':
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
            {/* <div> {user ? `Hello, ${user.name}` : 'You are not logged in'}</div>  테스트용*/}
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
                <div className='diz_text'>{selectedData.populationDescription}</div>
              </div>
            </div>
            <div className='age'>
              <div className='age_top'></div>
              <div className='age_text'>연령대별 비율</div>
              <div className='age_bottom'>

                <AgePieChart data={selectedData.ageDistribution} width={200} height={200} />
                <div className='age_detail'>
                  <Zero /><span className='a_text'>10대⬇</span>
                  <First /><span className='a_text'>10대</span>
                  <Second /><span className='a_text'>20대</span>
                  <Third /><span className='a_text'>30대</span>
                  <Fourth /><span className='a_text'>40대</span>
                  <Fifth /><span className='a_text'>50대</span>
                  <Sixth /><span className='a_text'>60대</span>
                  <Seventh /><span className='a_text'>70대⬆</span>
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
                  <img src={sunnyIcon} alt="sunny" />
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
            <span className='today_date'>{formattedDate} 기준</span>
            <div>
              <div className='airpollution_state'>
                <div className='air_text'>통합대기환경지수</div>
                <StyledAirState className='air_state' status={selectedData.air_clearity}>{selectedData.air_clearity}</StyledAirState>
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
      <CommunityFloat className="community-float" />
      <div className='top-view'>
        <div className='top-image' onClick={() => navigate('/mypage')}><Image1 /></div>
        <div className='logo'><Dencity/></div>
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
        {renderDetailView()}
      </div>

    </div>
  );
}

export default MainPage;