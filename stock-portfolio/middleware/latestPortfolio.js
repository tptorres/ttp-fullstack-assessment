const Stock = require('../models/Stock');
const User = require('../models/User');

// @info Updates a user's portfolio to show current cash in stocks
module.exports = async (req, res, next) => {
  var portfolioCash = 0;
  try {
    const user = await User.findOne({ _id: req.user.id });
    const query = await Stock.find({ user: req.user.id });

    for await (const stock of query) {
      const { shareAmount, sharePrice } = stock;
      portfolioCash += shareAmount * sharePrice;
    }

    user.portfolio = portfolioCash.toFixed(2);
    await user.save();

    next();
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: 'Request Failed' });
  }
};
