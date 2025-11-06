import { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherModule = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Bangalore');

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/weather?city=${city}`, {
        timeout: 10000
      });
      setWeather(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Could not fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading weather data...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Weather in {weather?.city}</h2>
      <div className="space-y-2">
        <p className="text-4xl font-bold">{weather?.temperature}°C</p>
        <p className="capitalize">{weather?.description}</p>
        <p>Humidity: {weather?.humidity}%</p>
        <p>Wind Speed: {weather?.windSpeed} m/s</p>
      </div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="mt-4 p-2 border rounded w-full"
      />
    </div>
  );
};

export default WeatherModule;