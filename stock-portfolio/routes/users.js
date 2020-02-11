const express = require('express');
const router = express.Router();

// @route POST api/users
// The current route is now /api/users
router.post('/', (req, res) => {
  res.send('Register the user');
});

module.exports = router;
