const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

// User Model
const User = require('../models/User');

// @route POST api/users
// @info Registering a user
router.post(
  '/',
  [
    check('name', 'Please add a name')
      .not()
      .isEmpty(),
    check('email', 'Please add valid email').isEmail(),
    check('password', 'Please add a password longer than 6 characters').isLength({ min: 6 })
  ],
  (req, res) => {
    // Returns a result object
    const errors = validationResult(req);
    // If it is not empty, one of the fields hasnt been filled in
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('passsed');
  }
);

module.exports = router;
