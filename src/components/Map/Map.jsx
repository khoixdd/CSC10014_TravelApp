import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getPoiStyle } from '../../utils/helpers';
import 'leaflet/dist/leaflet.css';
import './Map.css';

// Component to handle map updates
function MapController({ center, zoom, markers }) {
  const map = useMap();
  const markersRef = useRef([]);


  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 2.0, easeLinearity: 0.25 });
    }
  }, [center, zoom, map]);

  // Handle markers
  useEffect(() => {
    // Clear old markers
    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    // Add new markers
    markers.forEach(markerData => {
      const { lat, lon, type, data } = markerData;
      const style = type === 'main' 
        ? { color: '#0ea5e9', icon: 'fa-star' } 
        : getPoiStyle(data?.tags);

      const html = `
        <div class="pin-wrapper">
          <div class="pin-inner" style="background:${style.color}; border-color:#fff">
            <i class="fa-solid ${style.icon} pin-icon"></i>
          </div>
          ${type === 'main' ? '<div class="pin-pulse"></div>' : ''}
        </div>
      `;

      const icon = L.divIcon({
        className: 'custom-leaflet-icon',
        html: html,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      });

      const marker = L.marker([lat, lon], { icon }).addTo(map);

      const popupContent = type === 'main'
        ? `<div style="text-align:center; font-family:'Inter'"><b>${data?.name}</b><br><span style="color:#666; font-size:11px">Điểm đến</span></div>`
        : `<div style="text-align:center; font-family:'Inter'"><b>${data?.tags?.name}</b><br><span style="color:${style.color}; font-size:11px">${style.label}</span></div>`;

      marker.bindPopup(popupContent);
      markersRef.current.push(marker);
    });
  }, [markers, map]);

  return null;
}

function Map({ center, zoom = 14, markers = [] }) {
  return (
    <div className="map-wrapper">
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        attributionControl={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        <MapController 
          center={center} 
          zoom={zoom} 
          markers={markers}
        />
      </MapContainer>
    </div>
  );
}

export default Map;
