import WeatherCard from '../WeatherCard';
import POIList from '../POIList';
import Skeleton from '../Skeleton';
import Translator from '../Translator';
import './Sidebar.css';

function Sidebar({ 
  isLoading, 
  weatherData, 
  locationName, 
  pois, 
  onPoiClick 
}) {
  return (
    <aside className="sidebar-wrapper">
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          {weatherData && (
            <WeatherCard data={weatherData} locationName={locationName} />
          )}
          <Translator />
          <POIList pois={pois} onPoiClick={onPoiClick} />
        </>
      )}
    </aside>
  );
}

export default Sidebar;
