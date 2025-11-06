const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { city = 'Bangalore' } = req.query;
    const url = `https://api.weatherstack.com/current?access_key=4eee234e996224215c3231d2f95c579e&query=${city}`;
    const response = await axios.get(url);

    if (!response.data.current) {
      throw new Error('Weather data not available');
    }

    const weather = {
      temperature: response.data.current.temperature,
      description: response.data.current.weather_descriptions[0],
      city: response.data.location.name,
      humidity: response.data.current.humidity,
      windSpeed: response.data.current.wind_speed
    };

    res.json(weather);
  } catch (error) {
    res.status(500).json({ 
      error: 'Could not fetch weather data', 
      details: error.message 
    });
  }
};