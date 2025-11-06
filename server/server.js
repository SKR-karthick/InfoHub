require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3005;

app.use(cors());
app.use(express.json());
app.get('/api/weather', async (req, res) => {
  try {
    const { city = 'Bangalore' } = req.query;
    
    console.log('Fetching weather for city:', city);
    const url = `https://api.weatherstack.com/current?access_key=4eee234e996224215c3231d2f95c579e&query=${city}`;
    console.log('Fetching weather from:', url);
    
    const response = await axios.get(url);

    if (!response.data.current) {
      throw new Error(response.data.error?.info || 'Weather API error');
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
    console.error('Weather API Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      code: error.code,
      url: error.config?.url
    });
    
    let errorMessage = 'Could not fetch weather data';
    if (error.code === 'ENOTFOUND') {
      errorMessage = 'Network connection error. Please check your internet connection.';
    } else if (error.response?.status === 401) {
      errorMessage = 'Invalid API key. Please check your API key configuration.';
    } else if (error.response?.data?.error) {
      errorMessage = error.response.data.error.info;
    }
    
    res.status(500).json({ error: errorMessage, details: error.message });
  }
});

// Currency conversion endpoint
app.get('/api/currency', async (req, res) => {
  try {
    const { amount = 1 } = req.query;
    console.log('Converting amount:', amount);

    // Get USD conversion
    const usdResponse = await axios.get(
      `https://api.getgeoapi.com/v2/currency/convert?api_key=44d013b894a7a900406add8f70d0d7ced848b4a8&from=INR&to=USD&amount=${amount}&format=json`
    );

    // Get EUR conversion
    const eurResponse = await axios.get(
      `https://api.getgeoapi.com/v2/currency/convert?api_key=44d013b894a7a900406add8f70d0d7ced848b4a8&from=INR&to=EUR&amount=${amount}&format=json`
    );

    const result = {
      usd: usdResponse.data.rates.USD.rate_for_amount,
      eur: eurResponse.data.rates.EUR.rate_for_amount,
      original: amount
    };

    res.json(result);
  } catch (error) {
    console.error('Currency API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      code: error.code
    });
    res.status(500).json({ 
      error: 'Could not fetch currency conversion data', 
      details: error.response?.data?.errors?.[0] || error.message 
    });
  }
});

// Quote generator endpoint
app.get('/api/quote', async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    const quote = {
      text: response.data[0].q,
      author: response.data[0].a
    };
    res.json(quote);
  } catch (error) {
    console.error('Quote API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Could not fetch quote', details: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server started successfully');
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop');
});