const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    const quote = {
      text: response.data[0].q,
      author: response.data[0].a
    };
    res.json(quote);
  } catch (error) {
    res.status(500).json({ 
      error: 'Could not fetch quote', 
      details: error.message 
    });
  }
};