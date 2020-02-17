const express = require('express');
const router = express.Router();
const config = require('config');
const axios = require('axios');
const auth = require('../middleware/auth');
const validate = require('../middleware/stockValidator');

router.get('/', [auth, validate], async (req, res) => {
  try {
    /* const rest = await axios.get(
      `https://cloud.iexapis.com/stable/stock/msft/quote?token=pk_3e83e86a69a84ba7af4a776091c61dc0&filter=open,%20latestPrice,%20isUSMarketOpen`
    ); */
    res.send('test');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

/* https://cloud.iexapis.com/stable/stock/market/quote?symbols=fb,msft,aapl&token=pk_3e83e86a69a84ba7af4a776091c61dc0&filter=symbol,open,latestPrice,isUSMarketOpen */
