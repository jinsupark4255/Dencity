import React from 'react';
import PropTypes from 'prop-types'; // 타입 체크를 위해 PropTypes를 import합니다.
import './ForecastTable.css';

const ForecastTable = ({ forecastData }) => { // forecastData를 prop으로 받습니다.
  return (
    <div style={{ overflowX: 'auto' }} className="forecast-table-container">
      <table className="forecast-table">
        <tbody>
          <tr>
            <th>시간</th>
            {forecastData.map((data) => (
              <td key={data.date}>{data.date}</td>
            ))}
          </tr>
          <tr>
            <th>날씨</th>
            {forecastData.map((data) => (
              <td key={data.date}>{data.weather}</td>
            ))}
          </tr>
          <tr>
            <th>온도</th>
            {forecastData.map((data) => (
              <td key={data.date}>{data.temperature}</td>
            ))}
          </tr>
          <tr>
            <th>강수량</th>
            {forecastData.map((data) => (
              <td key={data.date}>{data.precipitation}</td>
            ))}
          </tr>
          <tr>
            <th>강수확률</th>
            {forecastData.map((data) => (
              <td key={data.date}>{data.probability}</td>
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