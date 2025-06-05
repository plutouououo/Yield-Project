const axios = require('axios');

const getDummyOracleData = async () => {
  try {
    // Option 1: Use timestamp for dummy yield variation
    const timestamp = Math.floor(Date.now() / 1000);
    const yieldVariation = (timestamp % 100) / 1000; // Example: 0 to 0.099

    // Option 2: Fetch from an external API (e.g., mock price)
    // const response = await axios.get('https://api.example.com/price');
    // const price = response.data.price;

    return yieldVariation;
  } catch (error) {
    console.error('Oracle error:', error);
    return 0; // Fallback value
  }
};

module.exports = { getDummyOracleData };