const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const validate = require('../middleware/stockValidator');
const cors = require('cors');
const User = require('../models/User');
const Stock = require('../models/Stock');
const axios = require('axios');
const validateTicker = require('../middleware/tickerValidator');

// @route /api/auth
// @info Get all current stocks in portfolio
router.get('/', [auth, validate], async (req, res) => {
  try {
    // get most recent stocks
    const stocks = await Stock.find({ user: req.user.id }).sort({ date: -1 });
    res.json(stocks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  [
    auth,
    [
      check('symbol', 'Ticker symbol is required')
        .not()
        .isEmpty(),
      check('shareAmount', 'Amount not specified')
        .not()
        .isEmpty()
    ],
    validateTicker
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // If it is not empty, one of the fields hasnt been filled in

    if (!errors.isEmpty()) {
      console.log('EETTTT');
      return res.status(400).json({ errors: errors.array() });
    }
    const { symbol, shareAmount, sharePrice, color } = req.body;

    try {
      const newStock = new Stock({
        symbol,
        shareAmount,
        sharePrice,
        color,
        user: req.user.id // add the stock for a specific user
      });

      const stock = await newStock.save();
      res.json(stock);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route api/stocks/:id
// @info Update user's stock amount
router.put('/:id', auth, async (req, res) => {
  const { symbol, shareAmount, sharePrice } = req.body;

  const stockFields = {};
  if (symbol) stockFields.symbol = symbol;
  if (shareAmount) stockFields.shareAmount = shareAmount;

  try {
    // getting stock from db through parameter
    let stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).json({ msg: 'Stock not found' });

    // Update stock only if user owns its
    if (stock.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Authorization denied' });
    }

    stock = await Stock.findByIdAndUpdate(req.params.id, { $set: stockFields }, { new: true });
    res.json(stock);

    //
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/* router.put('/', auth, async (req, res) => {
  try {
    const query = Stock.find({ user: req.user.id });
    for await (const stock of query) {
      const price = await axios.get(
        `https://cloud.iexapis.com/stable/stock/${stock.symbol}/quote?token=sk_cc1c7f21c56d497db10a82203dc80584&filter=open,latestPrice,isUSMarketOpen`
      );
      stock.sharePrice = price.data.latestPrice;
      await stock.save();
    }
    const stocks = await Stock.find({ user: req.user.id }).sort({ date: -1 });
    res.json(stocks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}); */

module.exports = router;
