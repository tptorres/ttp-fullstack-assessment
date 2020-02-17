const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route GET /api/transactions
// @info Returns a list of all transactions made that is stored in the database
router.get('/', auth, async (req, res) => {
  try {
    const trans = await User.findOne({ _id: req.user.id }).select('transactions -_id');
    res.json(trans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
