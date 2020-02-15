const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route /api/auth
// @info Get logged in user
router.post(
  '/',
  [check('email', 'Please add a valid email').isEmail(), check('password', 'Please add a password').exists()],
  async (req, res) => {
    const errors = validationResult(req);
    // If it is not empty, one of the fields hasnt been filled in
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // User does not exist or invalid credentials
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const matches = await bcrypt.compare(password, user.password);

      // Password is incorrect
      if (!matches) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/', auth, async (req, res) => {
  try {
    // if the correct token is sent and logged in, the request will have a user object with it,
    // but we dont need the password so we omit it
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
