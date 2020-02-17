const axios = require('axios');
const Stock = require('../models/Stock');

module.exports = async (req, res, next) => {
  var cash = 0;
  try {
    const query = Stock.find({ user: req.user.id });
    for await (const stock of query) {
      const price = await axios.get(
        `https://cloud.iexapis.com/stable/stock/${stock.symbol}/quote?token=sk_cc1c7f21c56d497db10a82203dc80584&filter=open,latestPrice,isUSMarketOpen`
      );

      if (price.data.latestPrice === price.data.open) stock.color = 0;
      if (price.data.latestPrice > price.data.open) stock.color = 1;
      if (price.data.latestPrice < price.data.open) stock.color = -1;

      stock.sharePrice = price.data.latestPrice;
      await stock.save();
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: 'Request Failed' });
  }
};
