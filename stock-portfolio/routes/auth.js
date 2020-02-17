const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route /api/auth
// @info Checks if the credentials are valid and if they are returns a token that is put in local storage
router.post(
  '/',
  [
    check('email', 'Please add a valid email').isEmail(),
    check('password', 'Please add a password').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
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

      // Signs the token and includes how long it will last, as well as a payload to identify current user
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

// @route /api/auth
// @info Returns a user object to match valid token after page reloads
router.get('/', auth, async (req, res) => {
  try {
    // If the correct token is sent and logged in, the request will have a user object with it,
    // but we dont need the password so we omit it
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
