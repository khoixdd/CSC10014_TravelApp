import { CONFIG } from '../config';

// Fetch with retry logic
async function fetchWithRetry(url, retries = CONFIG.MAX_RETRY) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      return await res.json();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

// Get latitude and longitude from city name using OpenWeather Geo API
export async function getLatLonFromCity(cityName) {
  const url = `${CONFIG.API.OPENWEATHER_GEO}?q=${encodeURIComponent(cityName)}&limit=1&appid=${CONFIG.OPENWEATHER_API_KEY}`;
  const data = await fetchWithRetry(url);
  if (!data || data.length === 0) throw new Error("Không tìm thấy địa điểm.");
  return {
    lat: data[0].lat,
    lon: data[0].lon,
    name: data[0].local_names?.vi || data[0].name,
    country: data[0].country
  };
}

// Search location using Nominatim (backup)
export async function searchLocation(query) {
  // Try OpenWeather Geo API first
  try {
    return await getLatLonFromCity(query);
  } catch {
    // Fallback to Nominatim
    const url = `${CONFIG.API.NOMINATIM}?format=json&q=${encodeURIComponent(query)}&countrycodes=vn&limit=1&addressdetails=1`;
    const data = await fetchWithRetry(url);
    if (!data || data.length === 0) throw new Error("Không tìm thấy địa điểm.");
    return data[0];
  }
}

// Get current weather from OpenWeather API v2.5
export async function getWeather(lat, lon) {
  const url = `${CONFIG.API.OPENWEATHER_WEATHER}?lat=${lat}&lon=${lon}&appid=${CONFIG.OPENWEATHER_API_KEY}&units=metric&lang=vi`;
  return await fetchWithRetry(url);
}

// Get Points of Interest from Overpass API
export async function getPOIs(lat, lon) {
  const query = `
    [out:json][timeout:25];
    (
      node["tourism"](around:1000,${lat},${lon});
      node["historic"](around:1000,${lat},${lon});
      node["amenity"~"^(restaurant|cafe|fast_food|place_of_worship)$"](around:1000,${lat},${lon});
      node["leisure"~"^(park|garden|viewpoint)$"](around:1000,${lat},${lon});
      node["shop"~"^(mall|market|supermarket)$"](around:1000,${lat},${lon});
    );
    out 10;
  `;
  const url = `${CONFIG.API.OVERPASS}?data=${encodeURIComponent(query)}`;
  return await fetchWithRetry(url);
}

// Generate AI content using Ollama via backend
export async function generateAI(prompt) {
  const response = await fetch('http://localhost:5000/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate AI content');
  }

  return await response.json();
}
