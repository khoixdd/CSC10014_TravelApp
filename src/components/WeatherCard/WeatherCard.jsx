import { WEATHER_ICONS } from '../../config';
import './WeatherCard.css';

function WeatherCard({ data, locationName }) {
  if (!data) return null;

  // OpenWeather API response format
  const weatherMain = data.weather?.[0]?.main || 'Clear';
  const weatherDesc = data.weather?.[0]?.description || '';
  const info = WEATHER_ICONS[weatherMain] || { desc: weatherDesc, icon: 'fa-cloud' };
  
  const temp = Math.round(data.main?.temp || 0);
  const humidity = data.main?.humidity || 0;
  const windSpeed = Math.round((data.wind?.speed || 0) * 3.6); // Convert m/s to km/h
  const clouds = data.clouds?.all || 0; // Cloud coverage percentage

  return (
    <div className="weather-card">
      <div className="weather-main">
        <div>
          <div className="temp-display">{temp}°</div>
          <div className="loc-display">
            <span>{locationName}</span>
          </div>
          <div className="desc-display">{weatherDesc || info.desc}</div>
        </div>
        <i className={`fa-solid ${info.icon} weather-icon-large`}></i>
      </div>

      <div className="weather-grid">
        <div className="w-stat">
          <span className="w-val">{clouds}%</span>
          <span className="w-lbl">Mây</span>
        </div>
        <div className="w-stat">
          <span className="w-val">{humidity}%</span>
          <span className="w-lbl">Độ ẩm</span>
        </div>
        <div className="w-stat">
          <span className="w-val">{windSpeed}km/h</span>
          <span className="w-lbl">Gió</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
