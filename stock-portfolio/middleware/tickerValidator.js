const axios = require('axios');

module.exports = async (req, res, next) => {
  try {
    const { symbol } = req.body;
    const check = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=sk_cc1c7f21c56d497db10a82203dc80584&filter=symbol`
    );

    next();
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: 'Unknown symbol' });
  }
};
