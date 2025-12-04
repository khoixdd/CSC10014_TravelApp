import { useState, useCallback } from 'react';
import { Header, Map, Sidebar } from './components';
import { searchLocation, getWeather, getPOIs } from './services/api';
import { CONFIG } from './config';
import './App.css';

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState(CONFIG.DEFAULT_COORDS);
  const [mapZoom, setMapZoom] = useState(CONFIG.DEFAULT_ZOOM);
  const [markers, setMarkers] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [pois, setPois] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = useCallback(async (query) => {
    if (!query) {
      setMessage('Vui lòng nhập tên địa điểm!');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Geocoding
      const location = await searchLocation(query);
      const { lat, lon, name } = location;
      const displayName = name || query;

      // Parallel fetch weather & POIs
      const [weather, poisData] = await Promise.all([
        getWeather(lat, lon),
        getPOIs(lat, lon)
      ]);

      // Update state
      setMapCenter([parseFloat(lat), parseFloat(lon)]);
      setMapZoom(14);
      setLocationName(displayName);
      setWeatherData(weather);
      setPois(poisData.elements || []);

      // Create markers
      const newMarkers = [
        { lat: parseFloat(lat), lon: parseFloat(lon), type: 'main', data: { name: displayName } }
      ];

      // Add POI markers
      const validPois = (poisData.elements || [])
        .filter(p => p.lat && p.lon && p.tags?.name)
        .slice(0, 5);

      validPois.forEach(poi => {
        newMarkers.push({
          lat: poi.lat,
          lon: poi.lon,
          type: 'poi',
          data: poi
        });
      });

      setMarkers(newMarkers);
      setMessage(`Đã tìm thấy: ${displayName}`);

    } catch (err) {
      console.error(err);
      setMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handlePoiClick = useCallback((poi) => {
    setMapCenter([poi.lat, poi.lon]);
    setMapZoom(17);
  }, []);

  return (
    <>
      <Header
        onSearch={handleSearch}
        isLoading={isLoading}
        message={message}
      />

      <div className="app-container">
        <Map
          center={mapCenter}
          zoom={mapZoom}
          markers={markers}
        />

        <Sidebar
          isLoading={isLoading}
          weatherData={weatherData}
          locationName={locationName}
          pois={pois}
          onPoiClick={handlePoiClick}
        />
      </div>
    </>
  );
}

export default App;
