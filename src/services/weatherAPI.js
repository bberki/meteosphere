import axios from 'axios';

const BASE_URL = 'https://api.weatherapi.com/v1'

export const fetchWeatherByCity = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/current.json`, {
            params: {
                key: import.meta.env.VITE_WEATHER_API_KEY,
                q: city,
                aqi: 'no',
            },
        });
        return response.data;
    } catch(error){
        console.error('WeatherAPI Hata:', error);
        return null;
    }
};

export const fetchCitySuggestions = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search.json`, {
      params: {
        key: import.meta.env.VITE_WEATHER_API_KEY,
        q: query,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Şehir önerisi hatası:", error);
    return [];
  }
};