const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const validate = require('../middleware/stockValidator');
const Stock = require('../models/Stock');
const validateTicker = require('../middleware/tickerValidator');

// @route GET /api/stocks
// @info Get all current stocks in portfolio. Validates user with auth middleware passed in ( and does so in most other functions as well )
// Extensive middleware layer ; turned the function into an API layer so as to grab most updated prices
router.get('/', [auth, validate], async (req, res) => {
  try {
    // get most recent stocks
    const stocks = await Stock.find({ user: req.user.id }).sort({ shareAmount: -1 });
    res.json(stocks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    s;
  }
});

// @route POST /api/stocks
// @info Creates a new stock in the users portfolio and middleware updates corresponding state changes.
// In this case of a POST request, we attach stock price and color to the request itself to be able to update UI immediately.
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
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { symbol, shareAmount } = req.body;
    const sharePrice = req.stockPrice;
    const color = req.color;

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

// @route PUT api/stocks/:id
// @info Updates a user's stock. Middleware validates input and then updates corresponding state changes
router.put('/:id', [auth, validateTicker], async (req, res) => {
  const { shareAmount } = req.body;

  const stockField = {};
  if (shareAmount) stockField.shareAmount = shareAmount;

  try {
    // getting stock from database through parameter
    let stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).json({ msg: 'Stock not found' });

    // Update stock only if user owns its
    if (stock.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Authorization denied' });
    }

    stockField.shareAmount += stock.shareAmount;
    stock = await Stock.findByIdAndUpdate(req.params.id, { $set: stockField }, { new: true });

    const stocks = await Stock.find({ user: req.user.id }).sort({ shareAmount: -1 });
    res.json(stocks);

    //
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
