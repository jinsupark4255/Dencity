import React from 'react';
import PropTypes from 'prop-types'; // 타입 체크를 위해 PropTypes를 import합니다.
import './ForecastTable.css';
import sunnyIcon1 from './images/맑음1.svg';
import sunnyIcon2 from './images/맑음2.svg';
import cloudyIcon1 from './images/구름많음1.svg';
import cloudyIcon2 from './images/구름많음2.svg';
import overcastIcon from './images/흐림.svg';


const ForecastTable = ({ forecastData }) => { // forecastData를 prop으로 받습니다.
  return (
    <div style={{ overflowX: 'auto' }} className="forecast-table-container">
      <table className="forecast-table">
        <tbody>
          <tr>
            <th>시간</th>
            {forecastData.map((data) => (
              <td key={data.date}>{data.date}시</td>
            ))}
          </tr>
          <tr>
          <th>날씨</th>
            {forecastData.map((data) => (
              <td key={data.date} style={{ textAlign: 'center' }}>
                {data.weather === '맑음' && (
                  <img
                    src={data.date >= 6 && data.date <= 17 ? sunnyIcon1 : sunnyIcon2}
                    alt="맑음"
                    width="21px"
                    height="21px"
                  />
                )}
                {data.weather === '구름많음' && (
                  <img
                    src={data.date >= 6 && data.date <= 17 ? cloudyIcon1 : cloudyIcon2}
                    alt="구름많음"
                    width="21px"
                    height="21px"
                  />
                )}
                {data.weather === '흐림' && (
                  <img src={overcastIcon} alt="흐림" width="21px" height="21px" />
                )}
              </td>
            ))}
          
          </tr>
          <tr>
            <th>온도</th>
            {forecastData.map((data) => (
              <td key={data.date}>{data.temperature}°C</td>
            ))}
          </tr>
          <tr>
            <th>강수량</th>
            {forecastData.map((data) => (
              <td key={data.date}>
                {data.precipitation === '-' ? '-' : data.precipitation === '빗방울' ? '빗방울' : `${data.precipitation} mm`}
              </td>
            ))}
          </tr>
          <tr>
            <th>강수확률</th>
            {forecastData.map((data) => (
              <td key={data.date}>{data.probability}%</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

ForecastTable.propTypes = {
  forecastData: PropTypes.array.isRequired, // Prop 타입을 검사합니다.
};

export default ForecastTable;