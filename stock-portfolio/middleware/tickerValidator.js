const axios = require('axios');

module.exports = async (req, res, next) => {
  try {
    var flag = false;
    const { symbol, shareAmount } = req.body;
    if (!Number.isInteger(shareAmount)) {
      flag = true;
      throw { msg: 'Only whole shares can be bought' };
    }
    await axios.get(
      `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=sk_cc1c7f21c56d497db10a82203dc80584&filter=symbol`
    );
    next();
  } catch (err) {
    console.error(err.message);
    res.status(404).json(flag ? err : { msg: 'Unknown symbol' });
  }
};
