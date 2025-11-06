const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { amount = 1 } = req.query;
    const baseUrl = 'https://api.getgeoapi.com/v2/currency/convert';
    const apiKey = '44d013b894a7a900406add8f70d0d7ced848b4a8';

    const [usdResponse, eurResponse] = await Promise.all([
      axios.get(`${baseUrl}?api_key=${apiKey}&from=INR&to=USD&amount=${amount}&format=json`),
      axios.get(`${baseUrl}?api_key=${apiKey}&from=INR&to=EUR&amount=${amount}&format=json`)
    ]);

    const result = {
      usd: usdResponse.data.rates.USD.rate_for_amount,
      eur: eurResponse.data.rates.EUR.rate_for_amount,
      original: amount
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      error: 'Could not fetch currency conversion data', 
      details: error.message 
    });
  }
};