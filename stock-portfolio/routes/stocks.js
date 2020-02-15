const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');

const User = require('../models/User');
const Stock = require('../models/Stock');

// @route /api/auth
// @info Get all current stocks in portfolio
router.get('/', auth, async (req, res) => {
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
      check('quantity', 'Amount not specified')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // If it is not empty, one of the fields hasnt been filled in
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { symbol, quantity } = req.body;

    try {
      const newStock = new Stock({
        symbol,
        quantity,
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
// @info Update user's stock
router.put('/:id', auth, async (req, res) => {
  const { symbol, quantity } = req.body;

  const stockFields = {};
  if (symbol) stockFields.symbol = symbol;
  if (quantity) stockFields.quantity = quantity;

  try {
    let stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).json({ msg: 'Stock not found' });

    // Update stock only if user owns its
    if (stock.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Authorization denied' });
    }

    stock = await Stock.findByIdAndUpdate(req.params.id, { $set: stockFields }, { new: true });
    res.json(stock);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
