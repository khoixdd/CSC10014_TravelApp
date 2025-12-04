// Configuration constants
export const CONFIG = {
  DEFAULT_COORDS: [16.047, 108.206], // Đà Nẵng Center
  DEFAULT_ZOOM: 6,
  MAX_RETRY: 3,
  // TODO: Paste your OpenWeather API key here
  OPENWEATHER_API_KEY: 'db88cb720f19515afb896547690644ea',
  API: {
    NOMINATIM: 'https://nominatim.openstreetmap.org/search',
    OVERPASS: 'https://overpass-api.de/api/interpreter',
    OPENWEATHER_GEO: 'http://api.openweathermap.org/geo/1.0/direct',
    OPENWEATHER_WEATHER: 'https://api.openweathermap.org/data/2.5/weather'
  }
};

// OpenWeather condition codes mapping
export const WEATHER_ICONS = {
  'Clear': { desc: 'Trời quang đãng', icon: 'fa-sun' },
  'Clouds': { desc: 'Có mây', icon: 'fa-cloud' },
  'Rain': { desc: 'Mưa', icon: 'fa-cloud-rain' },
  'Drizzle': { desc: 'Mưa phùn', icon: 'fa-cloud-rain' },
  'Thunderstorm': { desc: 'Giông bão', icon: 'fa-bolt' },
  'Snow': { desc: 'Tuyết rơi', icon: 'fa-snowflake' },
  'Mist': { desc: 'Sương mù', icon: 'fa-smog' },
  'Fog': { desc: 'Sương mù dày', icon: 'fa-smog' },
  'Haze': { desc: 'Sương mờ', icon: 'fa-smog' },
  'Dust': { desc: 'Bụi', icon: 'fa-smog' },
  'Smoke': { desc: 'Khói', icon: 'fa-smog' }
};
