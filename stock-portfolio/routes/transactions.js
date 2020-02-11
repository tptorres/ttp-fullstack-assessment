const express = require('express');
const router = express.Router();

// @route /api/auth
// @desc Get past transactions
// @access Public
// Maybe add pagination later on
router.get('/', (req, res) => {
  res.send('Get all transactions for a specific user ');
});

module.exports = router;
