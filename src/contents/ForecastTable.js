import React from 'react';
import './ForecastTable.css';

const forecastData = [
  { date: '16', weather: 'clo', temperature: '30', precipitation: '--', probability: '30%' },
  { date: '17', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
  { date: '18', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
  { date: '19', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
  { date: '20', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
  { date: '21', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
  { date: '22', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
  { date: '23', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
  { date: '24', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' },
  { date: '25', weather: 'sun', temperature: '30', precipitation: '--', probability: '30%' }
];

const ForecastTable = () => {
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

export default ForecastTable;
