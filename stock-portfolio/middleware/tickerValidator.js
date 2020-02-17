const axios = require('axios');
const User = require('../models/User');
const uuid = require('uuid');

// @info Validates input from user when buying a stock. Checks all possible incorrect inputs before calling to see if the symbol is valid
// After, the transaction is written to the database, and based off user's payment, state changes occur and values are updated
// Finally, in the case of a new stock being added to a user's portfolio, color and price are attached to the request body so as to
// bypass defualt values
module.exports = async (req, res, next) => {
  try {
    var flag = false;
    const { symbol, shareAmount } = req.body;
    const user = await User.findOne({ _id: req.user.id });
    const { cash } = user;

    if (shareAmount === 0) {
      flag = true;
      throw { msg: 'Must specify an amount' };
    }

    if (!Number.isInteger(shareAmount)) {
      flag = true;
      throw { msg: 'Only whole shares can be bought' };
    }

    const priceCheck = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=sk_cc1c7f21c56d497db10a82203dc80584&filter=symbol,latestPrice,open`
    );

    const price = priceCheck.data.latestPrice;
    if (price * shareAmount > cash) {
      flag = true;
      throw { msg: 'Not enough cash to buy that quantity of stocks' };
    }

    // Create a unique id for each trade in the transactions array to pass it as the key prop when displaying
    const id = uuid.v4();

    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $push: {
          transactions: { id: id, symbol: symbol, shareAmount: shareAmount, sharePrice: price }
        }
      },
      { new: true }
    );

    //
    req.stockPrice = price;
    if (priceCheck.data.latestPrice === priceCheck.data.open) req.color = 0;
    if (priceCheck.data.latestPrice > priceCheck.data.open) req.color = 1;
    if (priceCheck.data.latestPrice < priceCheck.data.open) req.color = -1;

    const newCashAmount = cash - price * shareAmount;
    user.cash = newCashAmount.toFixed(2);
    user.save();

    next();
  } catch (err) {
    console.error(err.message);
    res.status(404).json(flag ? err : { msg: 'Unknown symbol' });
  }
};
